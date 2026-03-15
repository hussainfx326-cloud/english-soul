import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(req: Request) {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });

    const formData = await req.formData();
    const audioFile = formData.get('file') as Blob;
    
    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // OpenAI Whisper expects a File object
    const file = new File([audioFile], "audio.webm", { type: audioFile.type });

    const transcription = await openai.audio.transcriptions.create({
      file,
      model: "whisper-1",
      language: "en" // Since we evaluating English speech
    });

    return NextResponse.json({ text: transcription.text });
  } catch (error) {
    console.error('Whisper API Error:', error);
    return NextResponse.json({ error: 'Failed to transcribe audio' }, { status: 500 });
  }
}
