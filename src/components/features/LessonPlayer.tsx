"use client";

import { useState } from "react";
import { X, Heart, Settings, LayoutGrid, Check, ArrowRight } from "lucide-react";

export default function LessonPlayer() {
    const [progress, setProgress] = useState(30);

    return (
        <div className="fixed inset-0 bg-background z-[100] flex flex-col">
            {/* Top Header */}
            <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border-glass bg-background/80 backdrop-blur-md">
                <button className="p-2 text-foreground/60 hover:text-foreground hover:bg-foreground/5 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                </button>

                {/* Progress Bar */}
                <div className="flex-1 max-w-xl mx-8">
                    <div className="h-3 bg-border-glass rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-color-success-500 to-color-primary-500 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-foreground/80 font-bold">
                    <div className="flex items-center gap-1 text-color-danger-500">
                        <Heart className="w-5 h-5 fill-current" />
                        <span>5</span>
                    </div>
                    <button className="p-2">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Main Lesson Content Area */}
            <main className="flex-1 overflow-y-auto px-4 py-8">
                <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in slide-in-from-right-8 duration-500">

                    <div className="self-start mb-4">
                        <span className="text-xl font-display font-bold text-foreground">Select the correct translation</span>
                        <p className="text-foreground/60 text-lg mt-1 text-left">"I have been working here for 5 years."</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        {/* Options */}
                        {["Trabajo aquí desde hace 5 años.", "He trabajado aquí por 5 años.", "Yo trabajo aquí 5 años.", "Estuve trabajando aquí 5 años."].map((opt, i) => (
                            <button
                                key={i}
                                className="glass p-6 rounded-2xl border-2 border-border-glass hover:bg-color-primary-50 hover:border-color-primary-500 hover:text-color-primary-600 transition-all font-medium text-lg text-left"
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer Action Bar */}
            <footer className="h-24 border-t border-border-glass bg-background flex flex-col justify-center">
                <div className="max-w-4xl mx-auto w-full px-4 md:px-8 flex items-center justify-between">
                    <button className="flex border-2 border-border-glass hover:bg-foreground/5 font-bold px-6 py-3 rounded-2xl transition-colors text-foreground/60">
                        Skip
                    </button>

                    <button className="bg-color-primary-600 hover:bg-color-primary-500 text-white font-bold px-8 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-color-primary-500/20 transition-all active:scale-95">
                        <span>Check Answer</span>
                    </button>
                </div>
            </footer>
        </div>
    );
}
