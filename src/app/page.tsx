import Link from "next/link";
import { Sparkles, ArrowRight, Mic, BrainCircuit, Trophy } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-color-primary-500/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-color-accent-500/20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      {/* Navbar */}
      <nav className="w-full px-8 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-color-primary-500 to-color-accent-500 flex items-center justify-center text-white font-bold font-display shadow-lg shadow-color-primary-500/30">
            ES
          </div>
          <span className="font-display font-black text-xl text-foreground tracking-tight">English Soul</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-foreground/70 hover:text-foreground transition-colors px-4 py-2">
            Sign In
          </Link>
          <Link href="/signup" className="text-sm font-bold bg-foreground text-background px-5 py-2.5 rounded-full hover:bg-foreground/90 transition-all shadow-md active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center -mt-10 px-6 z-10 text-center max-w-5xl mx-auto w-full">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-color-primary-500/30 bg-color-primary-500/10 text-color-primary-600 font-bold text-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Sparkles className="w-4 h-4" />
          <span>The Next-Gen AI Language Platform</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-foreground tracking-tight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          Master English with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-primary-500 to-color-accent-500">
             Artificial Intelligence
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-foreground/60 max-w-2xl font-medium mb-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-150">
          Experience hyper-personalized lessons, real-time pronunciation feedback via Whisper AI, and intelligent grammar tutoring. Fluency is now a science.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          <Link href="/signup" className="h-14 px-8 rounded-full bg-gradient-to-r from-color-primary-600 to-color-accent-600 text-white font-bold text-lg flex items-center gap-2 hover:shadow-xl hover:shadow-color-primary-500/30 transition-all hover:-translate-y-1 active:scale-95">
            Start Learning For Free <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/login" className="h-14 px-8 rounded-full bg-background border-2 border-border-glass text-foreground font-bold text-lg flex items-center justify-center hover:bg-foreground/5 transition-all">
            I already have an account
          </Link>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-24 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 text-left">
           {[
             { title: "Smart AI Tutor", icon: <BrainCircuit className="w-6 h-6 text-color-primary-500" />, desc: "Chat with a GPT-4o powered tutor that corrects your grammar in real-time." },
             { title: "Speaking Simulator", icon: <Mic className="w-6 h-6 text-color-accent-500" />, desc: "Gain confidence by practicing real-world voice scenarios with Whisper API." },
             { title: "Gamified Progress", icon: <Trophy className="w-6 h-6 text-color-warning-500" />, desc: "Earn XP, streak badges, and climb competitive learning leagues." },
           ].map((feat, i) => (
             <div key={i} className="p-6 rounded-3xl bg-background/50 border border-border-glass backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center mb-4">
                   {feat.icon}
                </div>
                <h3 className="text-xl font-bold font-display text-foreground mb-2">{feat.title}</h3>
                <p className="text-foreground/60 font-medium leading-relaxed">{feat.desc}</p>
             </div>
           ))}
        </div>
      </main>
    </div>
  );
}
