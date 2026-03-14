"use client";

import { useState } from "react";
import { Mic, Headphones, BookOpen, PenTool, Play, Pause, ChevronRight } from "lucide-react";

type ModuleType = "reading" | "listening" | "speaking" | "writing";

export default function InteractiveModule() {
  const [activeModule, setActiveModule] = useState<ModuleType>("reading");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");

  const modules = [
    { id: "reading", icon: BookOpen, label: "Read" },
    { id: "listening", icon: Headphones, label: "Listen" },
    { id: "speaking", icon: Mic, label: "Speak" },
    { id: "writing", icon: PenTool, label: "Write" }
  ] as const;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Header and Module Switcher */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Office Small Talk</h2>
          <p className="text-foreground/60 text-sm">Level B2 • Comprehension & Production</p>
        </div>
        
        <div className="glass flex p-1 rounded-2xl border border-border-glass max-w-full overflow-x-auto">
          {modules.map((mod) => {
             const Icon = mod.icon;
             const isActive = activeModule === mod.id;
             return (
               <button
                 key={mod.id}
                 onClick={() => setActiveModule(mod.id)}
                 className={`flex flex-col items-center gap-1 min-w-[70px] px-4 py-2 rounded-xl transition-all ${
                   isActive ? "bg-color-primary-500 text-white shadow-md shadow-color-primary-500/30" : "text-foreground/60 hover:text-foreground hover:bg-foreground/5"
                 }`}
               >
                 <Icon className="w-5 h-5" />
                 <span className="text-[10px] uppercase font-bold tracking-wide">{mod.label}</span>
               </button>
             );
          })}
        </div>
      </div>

      {/* Dynamic Content Area based on Selection */}
      <div className="glass rounded-3xl p-6 md:p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300">
        
        {activeModule === "reading" && (
          <div className="w-full animate-in fade-in slide-in-from-right-4">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <BookOpen className="text-color-primary-500 w-6 h-6" /> Reading Passage
            </h3>
            <div className="bg-background/50 p-6 rounded-2xl border border-border-glass text-foreground/90 space-y-4 text-lg leading-relaxed">
              <p>
                <strong>Sarah:</strong> "Hey Mark, did you catch the game last night?"
              </p>
              <p>
                <strong>Mark:</strong> "Unfortunately, no. I was tied up with the quarterly reports until 9 PM. How did it go? I heard it was a nail-biter."
              </p>
              <p>
                <strong>Sarah:</strong> "It absolutely was! They pulled off a miracle in the final quarter."
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button className="bg-color-primary-100 text-color-primary-700 hover:bg-color-primary-200 px-6 py-2 rounded-xl font-bold transition-colors">Translate</button>
            </div>
          </div>
        )}

        {activeModule === "listening" && (
          <div className="w-full text-center animate-in fade-in slide-in-from-right-4 space-y-8">
             <div className="w-32 h-32 mx-auto bg-color-accent-100 rounded-full flex items-center justify-center relative shadow-[0_0_40px_rgba(124,58,237,0.2)]">
               {isPlaying && (
                 <>
                   <div className="absolute inset-0 rounded-full border border-color-accent-500/50 animate-ping"></div>
                   <div className="absolute inset-[-20px] rounded-full border border-color-accent-500/20 animate-pulse"></div>
                 </>
               )}
               <button 
                 onClick={() => setIsPlaying(!isPlaying)}
                 className="w-20 h-20 bg-color-accent-500 hover:bg-color-accent-600 rounded-full flex items-center justify-center text-white transition-all shadow-xl shadow-color-accent-500/30 active:scale-95"
               >
                 {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
               </button>
             </div>
             
             <div>
               <h3 className="font-display font-bold text-xl text-foreground">Audio Track 1: Small Talk</h3>
               <p className="text-foreground/50 mt-1">Listen to the natural American pronunciation.</p>
             </div>

             <div className="w-full max-w-md mx-auto h-2 bg-border-glass rounded-full overflow-hidden">
                <div className={`h-full bg-color-accent-500 rounded-full transition-all duration-1000 ${isPlaying ? "w-3/4" : "w-0"}`}></div>
             </div>
          </div>
        )}

        {activeModule === "speaking" && (
          <div className="w-full text-center animate-in fade-in slide-in-from-right-4 space-y-8">
            <div>
               <h3 className="text-xl font-bold text-foreground mb-2">Your Turn: Respond to Sarah</h3>
               <div className="bg-background/80 p-4 rounded-xl border border-color-primary-100 text-color-primary-900 inline-block">
                 "They pulled off a miracle in the final quarter."
               </div>
            </div>

            <div className="py-8">
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center text-white transition-all shadow-xl active:scale-95 ${
                  isRecording 
                  ? "bg-color-danger-500 shadow-color-danger-500/40 animate-pulse" 
                  : "bg-gradient-to-tr from-color-primary-600 to-color-accent-500 shadow-color-primary-500/30"
                }`}
              >
                <Mic className={`w-10 h-10 ${isRecording ? "animate-bounce" : ""}`} />
              </button>
              <p className={`mt-4 font-bold ${isRecording ? "text-color-danger-500" : "text-foreground/40"}`}>
                {isRecording ? "Listening..." : "Tap to Speak"}
              </p>
            </div>
            
            <p className="text-sm text-foreground/50 max-w-xs mx-auto">
              Tip: Express surprise or agreement. For example, "Wow, I wish I had seen it!"
            </p>
          </div>
        )}

        {activeModule === "writing" && (
          <div className="w-full animate-in fade-in slide-in-from-right-4">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <PenTool className="text-color-secondary-500 w-6 h-6" /> Writing Practice
            </h3>
            <p className="text-foreground/80 mb-4">Write a brief email to Mark summarizing the game highlights so he feels included.</p>
            
            <textarea 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Hey Mark, I know you missed the game, so..."
               className="w-full min-h-[150px] bg-background/50 border border-border-glass rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-color-secondary-500 resize-none font-sans text-foreground"
            ></textarea>

            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs font-bold font-mono text-foreground/40">{inputText.length} / 300 chars</span>
              <button 
                disabled={inputText.length < 10}
                className="bg-color-secondary-500 hover:bg-color-secondary-600 text-white font-bold px-6 py-2 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-color-secondary-500/20"
              >
                Submit for AI Review
              </button>
            </div>
          </div>
        )}

      </div>
      
      {/* Bottom Progress Navigation */}
      <div className="flex justify-between items-center px-2">
        <button className="text-foreground/50 font-medium hover:text-foreground">Previous</button>
        <button className="bg-foreground text-background font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:opacity-90 transition-opacity">
          Next Step <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
}
