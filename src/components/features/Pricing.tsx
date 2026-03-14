"use client";

import { Check, X, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function Pricing() {
  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500 py-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground tracking-tight">
          Unlock your full <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-primary-600 to-color-accent-600">potential</span>
        </h1>
        <p className="text-lg text-foreground/60">
          Join thousands of learners reaching C3 fluency faster with our AI-powered immersive learning experience.
        </p>
      </div>

      {/* Pricing Toggle (Monthly/Yearly) */}
      <div className="flex justify-center">
         <div className="glass p-1 rounded-2xl flex items-center border border-border-glass">
            <button className="px-6 py-2 rounded-xl text-foreground/60 font-medium hover:text-foreground transition-colors">Monthly</button>
            <button className="px-6 py-2 rounded-xl bg-background shadow-sm text-foreground font-bold flex items-center gap-2">
              Yearly <span className="text-[10px] uppercase bg-color-success-100 text-color-success-700 px-2 py-0.5 rounded-full tracking-wider">Save 40%</span>
            </button>
         </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* Basic Plan */}
        <div className="glass rounded-3xl p-8 border border-border-glass relative overflow-hidden flex flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
           <div className="mb-8">
             <h2 className="text-2xl font-display font-bold text-foreground">Basic</h2>
             <p className="text-foreground/60 mt-2">Essential tools to start your journey.</p>
             <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold text-foreground">Free</span>
             </div>
           </div>

           <ul className="space-y-4 mb-8 flex-1">
             <li className="flex items-start gap-3 text-foreground/80">
               <Check className="w-5 h-5 text-color-success-500 shrink-0 mt-0.5" />
               <span>Access to B1 to C1 core curriculum</span>
             </li>
             <li className="flex items-start gap-3 text-foreground/80">
               <Check className="w-5 h-5 text-color-success-500 shrink-0 mt-0.5" />
               <span>Basic grammar and vocabulary exercises</span>
             </li>
             <li className="flex items-start gap-3 text-foreground/80">
               <Check className="w-5 h-5 text-color-success-500 shrink-0 mt-0.5" />
               <span>Join weekly Bronze & Silver Leagues</span>
             </li>
             <li className="flex items-start gap-3 text-foreground/40 line-through">
               <X className="w-5 h-5 shrink-0 mt-0.5" />
               <span>Advanced Speaking Conversation Simulator</span>
             </li>
             <li className="flex items-start gap-3 text-foreground/40 line-through">
               <X className="w-5 h-5 shrink-0 mt-0.5" />
               <span>Real-time AI Grammar Tutor</span>
             </li>
           </ul>

           <button className="w-full py-4 rounded-2xl border-2 border-border-glass text-foreground font-bold hover:bg-foreground/5 transition-colors">
             Current Plan
           </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-br from-color-primary-900 to-color-accent-900 rounded-3xl p-8 text-white relative flex flex-col shadow-2xl shadow-color-primary-500/20 transition-all hover:-translate-y-1">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[50px] pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute top-4 right-4">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md border border-white/10 text-xs font-bold uppercase tracking-wider">
                 <Sparkles className="w-4 h-4" /> Most Popular
              </div>
           </div>

           <div className="mb-8 relative z-10">
             <h2 className="text-2xl font-display font-bold">English Soul Pro</h2>
             <p className="text-white/70 mt-2">Unlimited power for serious learners.</p>
             <div className="mt-6 flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold text-white">$12.99</span>
                <span className="text-white/60 font-medium">/mo</span>
             </div>
             <p className="text-sm text-color-success-300 mt-2 font-medium">Billed annually at $155.88</p>
           </div>

           <ul className="space-y-4 mb-8 flex-1 relative z-10">
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span>Everything in Basic</span>
             </li>
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span><strong>Unlimited AI Feedback</strong> on Writing & Speaking</span>
             </li>
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span><strong>Advanced Speaking Simulator</strong> (Unlimited Mins)</span>
             </li>
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span>Unlock <strong>C2 & C3 Professional Modules</strong></span>
             </li>
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span>Official <strong>Certificate Generation</strong></span>
             </li>
             <li className="flex items-start gap-3 text-white/90">
               <div className="bg-white/20 p-1 rounded-full shrink-0"><Check className="w-3 h-3 text-white" /></div>
               <span>Offline Learning Support</span>
             </li>
           </ul>

           <button className="w-full py-4 rounded-2xl bg-white text-color-primary-900 font-bold hover:bg-white/90 transition-colors shadow-xl flex items-center justify-center gap-2 group relative z-10">
             <Zap className="w-5 h-5 text-color-secondary-500" />
             Upgrade to Pro
           </button>
           <p className="text-center text-xs text-white/50 mt-4 flex items-center justify-center gap-1 font-medium relative z-10">
              <ShieldCheck className="w-4 h-4" /> 7-day money-back guarantee
           </p>
        </div>

      </div>
    </div>
  );
}
