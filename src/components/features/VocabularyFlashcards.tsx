"use client";

import { useState } from "react";
import { Volume2, RotateCw, CheckCircle2, XCircle } from "lucide-react";

interface Flashcard {
    id: string;
    word: string;
    translation: string;
    context: string;
    type: string;
    level: string;
}

export default function VocabularyFlashcards() {
    const [isFlipped, setIsFlipped] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const cards: Flashcard[] = [
        {
            id: "1",
            word: "Ubiquitous",
            translation: "Omnipresente / En todas partes",
            context: "In modern society, smartphones have become ubiquitous.",
            type: "Adjective",
            level: "C1"
        },
        {
            id: "2",
            word: "Leverage",
            translation: "Aprovechar / Influencia",
            context: "We need to leverage our existing resources to win the deal.",
            type: "Verb",
            level: "B2"
        }
    ];

    const currentCard = cards[currentIndex];

    const handleNext = () => {
        setIsFlipped(false);
        setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % cards.length);
        }, 150);
    };

    return (
        <div className="w-full max-w-md mx-auto h-[600px] flex flex-col justify-center items-center">

            {/* Progress Header */}
            <div className="w-full flex items-center justify-between mb-8 px-4">
                <span className="text-foreground/60 font-bold text-sm">Reviewing 20 words</span>
                <div className="flex gap-2 text-sm font-bold">
                    <span className="text-color-success-500">12</span>
                    <span className="text-foreground/30">|</span>
                    <span className="text-color-danger-500">3</span>
                </div>
            </div>

            {/* The Flashcard (3D Flip Effect) */}
            <div
                className="relative w-full aspect-[3/4] cursor-pointer perspective-1000"
                onClick={() => setIsFlipped(!isFlipped)}
            >
                <div className={`w-full h-full transition-all duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}>

                    {/* Front of Card (English Word) */}
                    <div className="absolute inset-0 glass rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden shadow-2xl shadow-color-primary-500/10 border-2 border-border-glass bg-white dark:bg-background/80">
                        <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-color-primary-50 text-color-primary-600 text-xs font-bold uppercase tracking-wider">
                            {currentCard.level}
                        </div>

                        <button
                            className="absolute top-6 right-6 p-2 rounded-full text-foreground/40 hover:text-color-primary-500 hover:bg-color-primary-50 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                // TTS logic would go here
                            }}
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>

                        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mt-4 mb-2">
                            {currentCard.word}
                        </h2>
                        <span className="text-foreground/50 italic">{currentCard.type}</span>

                        <div className="absolute bottom-8 left-0 w-full flex items-center justify-center gap-2 text-foreground/40 text-sm font-medium">
                            <RotateCw className="w-4 h-4" />
                            <span>Tap to flip</span>
                        </div>
                    </div>

                    {/* Back of Card (Translation & Context) */}
                    <div className="absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center backface-hidden rotate-y-180 bg-gradient-to-br from-color-primary-600 to-color-accent-600 shadow-2xl shadow-color-primary-500/30 text-white">

                        <button
                            className="absolute top-6 right-6 p-2 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>

                        <h2 className="text-3xl font-display font-bold mb-4">
                            {currentCard.translation}
                        </h2>

                        <div className="w-full h-px bg-white/20 my-6"></div>

                        <p className="text-white/90 text-lg leading-relaxed italic">
                            "{currentCard.context}"
                        </p>
                    </div>

                </div>
            </div>

            {/* SRS Action Buttons (Only show when flipped) */}
            <div className={`w-full flex items-center justify-center gap-6 mt-12 transition-all duration-300 ${isFlipped ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="flex flex-col items-center gap-2 text-color-danger-500 hover:scale-110 transition-transform"
                >
                    <div className="w-16 h-16 rounded-full bg-color-danger-50 flex items-center justify-center shadow-lg shadow-color-danger-500/20 border-2 border-color-danger-100">
                        <XCircle className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-sm">Hard (1m)</span>
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    className="flex flex-col items-center gap-2 text-color-success-500 hover:scale-110 transition-transform"
                >
                    <div className="w-16 h-16 rounded-full bg-color-success-50 flex items-center justify-center shadow-lg shadow-color-success-500/20 border-2 border-color-success-100">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="font-bold text-sm">Easy (4d)</span>
                </button>

            </div>
        </div>
    );
}
