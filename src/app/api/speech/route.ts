import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });

    const formData = await req.formData();
    const audioBlob = formData.get('file') as Blob;
    
    if (!audioBlob) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert Blob to File required by openai SDK
    const file = new File([audioBlob], "audio.webm", { type: audioBlob.type || 'audio/webm' });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "en"
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Whisper API Error:', error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}
