import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import prisma from '@/lib/prisma';
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });

    const { conversationId, userLevel, message } = await req.json();

    if (!conversationId || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save User Message to DB
    const userMsg = await prisma.chatMessage.create({
        data: {
            conversationId,
            role: "user",
            content: message
        }
    });

    // Fetch up to last 10 messages for context
    const recentMessages = await prisma.chatMessage.findMany({
        where: { conversationId },
        orderBy: { createdAt: 'desc' },
        take: 10
    });
    
    // Reverse to chronological
    const contextMessages = recentMessages.reverse().map(m => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content
    }));

    const systemPrompt = `You are an expert English native tutor for a highly professional platform called English Soul.
Your student is currently at CEFR level ${userLevel || 'B1'}.
1. If the student makes a grammar or vocabulary mistake, you MUST provide a friendly correction.
2. Respond naturally to their questions or conversation.
3. Keep responses relatively concise but highly informative.
4. ALWAYS return your response in the following strict JSON format:
{
  "response": "Your friendly text response.",
  "correction": {
    "original": "The exact incorrect sentence (leave null if perfect).",
    "fixed": "The grammatically correct version (leave null if perfect).",
    "explanation": "A short explanation of why it was wrong (leave null if perfect)."
  }
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast and cheap for this usecase
      messages: [
        { role: 'system', content: systemPrompt },
        ...contextMessages
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const aiContent = completion.choices[0].message.content;
    let parsedResponse;
    
    try {
      parsedResponse = JSON.parse(aiContent || '{}');
    } catch(e) {
      throw new Error("Failed to parse OpenAI JSON response");
    }

    // Save AI Response to DB
    const assistantMsg = await prisma.chatMessage.create({
        data: {
            conversationId,
            role: "assistant",
            content: parsedResponse.response,
            hasCorrection: !!parsedResponse.correction?.original,
            correctionData: parsedResponse.correction?.original ? parsedResponse.correction : null
        }
    });

    return NextResponse.json({
        id: assistantMsg.id,
        role: "assistant",
        content: parsedResponse.response,
        correction: parsedResponse.correction?.original ? parsedResponse.correction : undefined
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to process AI response' }, { status: 500 });
  }
}
