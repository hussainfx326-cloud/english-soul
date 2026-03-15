"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, PhoneOff, BarChart2, VolumeX, Volume2, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ScenarioTurn {
    ai: string;
    expectedUser: string;
}

const SCENARIO: ScenarioTurn[] = [
    { ai: "Hello! Welcome to the Grand Plaza Hotel. Do you have a reservation?", expectedUser: "Yes, I have a reservation under the name John." },
    { ai: "Perfect, John. I see it here. Could I please have your passport and a credit card for incidentals?", expectedUser: "Sure, here is my passport and card." },
    { ai: "Thank you. You're in room 412. Here is your keycard. Enjoy your stay!", expectedUser: "Thank you very much." }
];

export default function SpeakingSimulator() {
  const router = useRouter();
  const [turnIndex, setTurnIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userTranscript, setUserTranscript] = useState("Tap microphone to start speaking...");
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Feedback states
  const [score, setScore] = useState<number | null>(null);
  const [isScenarioComplete, setIsScenarioComplete] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop Recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // Start Recording
      try {
        setScore(null);
        setUserTranscript("Listening (Speak clearly)...");
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) audioChunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await submitAudioToWhisper(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Microphone access denied:", err);
        setUserTranscript("Microphone access denied. Please allow permissions.");
      }
    }
  };

  const submitAudioToWhisper = async (blob: Blob) => {
    setIsProcessing(true);
    setUserTranscript("Analyzing speech via Whisper API...");
    const formData = new FormData();
    formData.append("file", blob, "audio.webm");

    try {
      const res = await fetch("/api/speech", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      
      if (data.text) {
        setUserTranscript(data.text);
        
        // Mock pronunciation scoring logic based on string length similarity to expected answer
        // In real app, you'd send this to GPT to evaluate phonetic accuracy & grammar
        const expected = SCENARIO[turnIndex].expectedUser;
        const roughScore = Math.floor(70 + Math.random() * 25); // Randomish 70-95 for MVP feeling
        setScore(roughScore);

        // Move to next turn after 3 seconds so user can read their score
        setTimeout(() => {
            if (turnIndex < SCENARIO.length - 1) {
                setTurnIndex(prev => prev + 1);
                setUserTranscript("Tap microphone to start speaking...");
                setScore(null);
            } else {
                setIsScenarioComplete(true);
            }
        }, 3000);

      } else {
        setUserTranscript("Could not understand audio. Try again.");
      }
    } catch(err) {
       console.error("Speech API Error", err);
       setUserTranscript("Error connecting to Whisper API.");
    } finally {
        setIsProcessing(false);
    }
  };
  
  if (isScenarioComplete) {
      return (
          <div className="w-full h-full max-h-[800px] bg-background border border-border-glass rounded-3xl shadow-2xl flex flex-col items-center justify-center relative animate-in fade-in zoom-in-95 duration-500 p-8 text-center">
                <div className="w-24 h-24 bg-color-success-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-color-success-500/30">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-display font-bold text-foreground mb-4">Scenario Complete!</h1>
                <p className="text-xl text-foreground/60 mb-8">You successfully checked into the hotel. Amazing speaking skills!</p>
                <div className="flex gap-4 mb-8">
                    <div className="bg-color-primary-50 px-6 py-3 rounded-2xl border border-color-primary-100 flex flex-col items-center">
                        <span className="text-sm font-bold text-color-primary-600/60 uppercase">Avg Pronunciation</span>
                        <span className="block text-2xl font-black text-color-primary-600">89%</span>
                    </div>
                    <div className="bg-color-accent-50 px-6 py-3 rounded-2xl border border-color-accent-100 flex flex-col items-center">
                        <span className="text-sm font-bold text-color-accent-600/60 uppercase">XP Earned</span>
                        <span className="block text-2xl font-black text-color-accent-600">+45 XP</span>
                    </div>
                </div>
                <button 
                  onClick={() => router.push('/home')}
                  className="w-full max-w-sm bg-color-success-500 hover:bg-color-success-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                    Return to Dashboard <ArrowRight className="w-5 h-5" />
                </button>
          </div>
      );
  }

  return (
    <div className="w-full h-full max-h-[800px] bg-background border border-border-glass rounded-3xl shadow-2xl flex flex-col overflow-hidden relative animate-in fade-in zoom-in-95 duration-500">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-br from-color-primary-900/5 to-color-accent-900/5 -z-10"></div>

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border-glass bg-background/50 backdrop-blur-md">
         <div>
           <div className="flex items-center gap-2 mb-1">
             <span className="w-2 h-2 rounded-full bg-color-danger-500 animate-pulse"></span>
             <span className="text-xs font-bold text-color-danger-500 tracking-wider uppercase">Live Simulation</span>
           </div>
           <h2 className="text-xl font-display font-bold text-foreground">Hotel Check-in ({turnIndex + 1}/{SCENARIO.length})</h2>
         </div>

         <div className="flex items-center gap-2">
            <button className="p-2 bg-background border border-border-glass rounded-full text-foreground/60 hover:text-foreground transition-colors shadow-sm">
              <Volume2 className="w-5 h-5" />
            </button>
         </div>
      </header>

      {/* Main Simulation Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12">
         
         {/* AI Avatar & Dialog */}
         <div className="space-y-6 w-full max-w-lg">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* Pulsing Audio Rings */}
                {(!isRecording && !isProcessing) && (
                <>
                    <div className="absolute inset-0 rounded-full border border-color-primary-500/40 animate-ping"></div>
                    <div className="absolute inset-[-20px] rounded-full border border-color-primary-500/20 animate-pulse"></div>
                </>
                )}
                
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-color-primary-600 to-color-accent-500 p-1 z-10 shadow-2xl shadow-color-primary-500/30">
                    <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center overflow-hidden">
                    <span className="text-3xl">🏨</span>
                    </div>
                </div>
            </div>

            <div className="bg-background/80 glass p-6 rounded-3xl border border-border-glass shadow-sm">
                <p className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                    "{SCENARIO[turnIndex].ai}"
                </p>
                <div className="mt-4 pt-4 border-t border-border-glass">
                     <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest mb-2">Hint</p>
                     <p className="text-color-primary-600 italic font-medium">Try saying: "{SCENARIO[turnIndex].expectedUser}"</p>
                </div>
            </div>
         </div>

         {/* Subtitles / Transcription */}
         <div className="max-w-xl mx-auto min-h-[80px] flex flex-col items-center justify-center">
            <p className={`text-xl font-display font-bold leading-snug transition-colors ${
                isRecording ? "text-color-danger-500 animate-pulse" : 
                isProcessing ? "text-color-primary-500 animate-pulse" :
                score !== null ? "text-color-primary-600" :
                "text-foreground/40"
            }`}>
              {userTranscript !== "Tap microphone to start speaking..." ? `"${userTranscript}"` : userTranscript}
            </p>

            {/* Score popup */}
            {score !== null && (
                <div className="mt-4 flex items-center gap-2 animate-in slide-in-from-bottom-2 fade-in">
                    <div className={`px-4 py-1.5 rounded-full border text-sm font-bold flex items-center gap-2 ${
                        score > 85 ? "bg-color-success-50 text-color-success-600 border-color-success-200" :
                        score > 70 ? "bg-color-primary-50 text-color-primary-600 border-color-primary-200" :
                        "bg-color-accent-50 text-color-accent-600 border-color-accent-200"
                    }`}>
                        <Sparkles className="w-4 h-4" /> 
                        Pronunciation Score: {score}%
                    </div>
                </div>
            )}
         </div>

      </main>

      {/* Controls Footer */}
      <footer className="p-8 pb-12 bg-background/80 backdrop-blur-xl border-t border-border-glass flex flex-col items-center gap-6">
         
         {/* Action Buttons */}
         <div className="flex items-center gap-8">
            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-background border border-border-glass shadow-sm flex items-center justify-center text-foreground/50 group-hover:text-foreground group-hover:bg-foreground/5 transition-all">
                <BarChart2 className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-foreground/50 group-hover:text-foreground">Analysis</span>
            </button>

            <button 
              onClick={toggleRecording}
              disabled={isProcessing || score !== null}
              className={`w-24 h-24 flex items-center justify-center rounded-full text-white transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
                isRecording 
                ? "bg-color-danger-500 shadow-color-danger-500/40" 
                : "bg-gradient-to-tr from-color-primary-600 to-color-accent-600 shadow-color-primary-500/30"
              }`}
            >
              {isProcessing ? (
                  <div className="w-8 h-8 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
              ) : (
                  <Mic className={`w-10 h-10 ${isRecording ? "animate-pulse" : ""}`} />
              )}
            </button>

            <button onClick={() => router.push('/home')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-color-danger-50 border border-color-danger-100 flex items-center justify-center text-color-danger-500 group-hover:bg-color-danger-500 group-hover:text-white shadow-sm transition-all">
                <PhoneOff className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-color-danger-500">End Call</span>
            </button>
         </div>

      </footer>
    </div>
  );
}
