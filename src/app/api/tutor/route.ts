import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    // Initialize the OpenAI client locally per-request
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });

    const { messages, userLevel } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid message format' }, { status: 400 });
    }

    const systemPrompt = `You are an expert English native tutor for a highly professional platform called English Soul.
Your student is currently at CEFR level ${userLevel || 'B1'}.
1. If the student makes a grammar or vocabulary mistake, you MUST provide a friendly correction.
2. Respond naturally to their questions or conversation.
3. ALWAYS return your response in the following strict JSON format, without markdown wrapping:
{
  "response": "Your friendly text response to the user's message.",
  "correction": {
    "original": "The exact sentence they wrote incorrectly (if any). If no mistake, leave null.",
    "fixed": "The grammatically correct version of that sentence (if any). If no mistake, leave null.",
    "explanation": "A short, easy-to-understand explanation of the grammar rule." // Leave null if no mistake
  }
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o', // or gpt-3.5-turbo
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
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

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json({ error: 'Failed to process AI response' }, { status: 500 });
  }
}
