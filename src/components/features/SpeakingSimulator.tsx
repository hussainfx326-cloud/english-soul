"use client";

import { useState, useRef } from "react";
import { Mic, PhoneOff, BarChart2, VolumeX, ShieldAlert, Sparkles } from "lucide-react";

export default function SpeakingSimulator() {
  const [isRecording, setIsRecording] = useState(false);
  const [scenario, setScenario] = useState("Checking into a hotel");
  const [aiDialogue, setAiDialogue] = useState("Hello! Welcome to the Grand Plaza Hotel. Do you have a reservation?");
  const [userTranscript, setUserTranscript] = useState("Tap microphone to start speaking...");
  
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
        setUserTranscript("Listening...");
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
        setUserTranscript("Microphone access denied.");
      }
    }
  };

  const submitAudioToWhisper = async (blob: Blob) => {
    setUserTranscript("Analyzing speech...");
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
        // Here you would send userTranscript back to the AI Chat API to get the next AI dialogue response!
      } else {
        setUserTranscript("Could not understand audio.");
      }
    } catch(err) {
       console.error("Speech API Error", err);
       setUserTranscript("Error connecting to Whisper API.");
    }
  };
  
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
           <h2 className="text-xl font-display font-bold text-foreground">{scenario}</h2>
         </div>

         <div className="flex items-center gap-2">
            <button className="p-2 bg-background border border-border-glass rounded-full text-foreground/60 hover:text-foreground transition-colors">
              <VolumeX className="w-5 h-5" />
            </button>
         </div>
      </header>

      {/* Main Simulation Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-12">
         
         {/* AI Avatar & Speech Wave */}
         <div className="relative w-48 h-48 flex items-center justify-center">
            {/* Pulsing Audio Rings (Only active when AI is "speaking") */}
            {!isRecording && (
              <>
                <div className="absolute inset-0 rounded-full border border-color-primary-500/40 animate-ping"></div>
                <div className="absolute inset-[-40px] rounded-full border border-color-primary-500/20 animate-pulse"></div>
                <div className="absolute inset-[-80px] rounded-full border border-color-primary-500/10"></div>
              </>
            )}
            
            <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-color-primary-600 to-color-accent-500 p-1 z-10 shadow-2xl shadow-color-primary-500/30">
               <div className="w-full h-full rounded-full bg-background flex flex-col items-center justify-center overflow-hidden">
                 <span className="text-4xl">🏨</span>
               </div>
            </div>
         </div>

         {/* Subtitles / Transcription */}
         <div className="max-w-md mx-auto min-h-[100px] flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-display font-bold text-foreground leading-snug">
              {isRecording || userTranscript !== "Tap microphone to start speaking..." ? (
                <span className={isRecording ? "text-color-danger-500 animate-pulse" : "text-color-primary-600"}>
                  "{userTranscript}"
                </span>
              ) : (
                `"${aiDialogue}"`
              )}
            </p>
         </div>

         {/* Real-time Feedback Chips */}
         {isRecording && (
           <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="bg-color-success-50 text-color-success-600 px-4 py-1.5 rounded-full border border-color-success-200 text-sm font-bold flex items-center gap-1">
                <Sparkles className="w-4 h-4" /> Clear Pronunciation
              </div>
              <div className="bg-color-secondary-50 text-color-secondary-600 px-4 py-1.5 rounded-full border border-color-secondary-200 text-sm font-bold flex items-center gap-1">
                Pacing: Good
              </div>
           </div>
         )}
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
              className={`w-24 h-24 flex items-center justify-center rounded-full text-white transition-all shadow-xl active:scale-95 ${
                isRecording 
                ? "bg-color-danger-500 shadow-color-danger-500/40" 
                : "bg-gradient-to-tr from-color-primary-600 to-color-accent-600 shadow-color-primary-500/30"
              }`}
            >
              <Mic className={`w-10 h-10 ${isRecording ? "animate-pulse" : ""}`} />
            </button>

            <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-full bg-color-danger-50 border border-color-danger-100 flex items-center justify-center text-color-danger-500 group-hover:bg-color-danger-500 group-hover:text-white shadow-sm transition-all">
                <PhoneOff className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-color-danger-500">End Call</span>
            </button>
         </div>

         {/* Visualizer Bar (Mock) */}
         <div className="flex items-end justify-center gap-1 h-8 opacity-50">
           {[...Array(20)].map((_, i) => (
             <div 
               key={i} 
               className={`w-1.5 rounded-t-full bg-color-primary-500 transition-all duration-75 ${isRecording ? "animate-pulse" : "h-1"}`}
               style={{ 
                 height: isRecording ? `${Math.max(20, Math.random() * 100)}%` : "4px",
                 animationDelay: `${i * 0.05}s`
               }}
             ></div>
           ))}
         </div>

      </footer>
    </div>
  );
}
