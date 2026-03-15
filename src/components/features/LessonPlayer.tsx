"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, ArrowRight, Flag, BookOpen, Volume2, Mic } from "lucide-react";
import { addXpToUser } from "@/app/actions/gamification";

export default function LessonPlayer({ lesson }: { lesson: any }) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    
    const [blankValues, setBlankValues] = useState<Record<number, string>>({});
    
    // Gamification state
    const [xpAwarded, setXpAwarded] = useState(false);

    const exercises = lesson.exercises;
    const progressPercent = ((currentIndex) / exercises.length) * 100;

    if (!exercises || exercises.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh]">
                <BookOpen className="w-16 h-16 text-color-primary-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Lesson Under Construction</h2>
                <p className="text-foreground/60 mb-6">We are still adding interactive exercises to this lesson.</p>
                <button 
                  onClick={() => router.push('/path')}
                  className="bg-color-primary-600 px-6 py-2 rounded-xl text-white font-bold"
                >
                    Back to Path
                </button>
            </div>
        );
    }

    const currentExercise = exercises[currentIndex];
    
    // Award XP on complete summary screen
    if (currentIndex >= exercises.length) {
        if (!xpAwarded) {
             setXpAwarded(true);
             addXpToUser(15).catch(err => console.error("Failed to add XP", err));
        }

        return (
            <div className="flex flex-col items-center justify-center p-12 text-center h-[60vh] animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-color-success-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-color-success-500/30">
                    <CheckCircle className="w-12 h-12" />
                </div>
                <h1 className="text-4xl font-display font-bold text-foreground mb-4">Lesson Complete!</h1>
                <div className="flex gap-4 mb-8">
                    <div className="bg-color-primary-50 px-6 py-3 rounded-2xl border border-color-primary-100">
                        <span className="block text-xl font-bold text-color-primary-600">+15 XP</span>
                    </div>
                </div>
                <button 
                  onClick={() => router.push('/path')}
                  className="w-full max-w-sm bg-color-success-500 hover:bg-color-success-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg"
                >
                    Continue
                </button>
            </div>
        );
    }

    const handleCheckQuiz = () => {
        const correctIndex = currentExercise.content.questions?.[0]?.correctAnswer ?? 0;
        if (selectedAnswer === correctIndex) setIsCorrect(true);
        else setIsCorrect(false);
        setShowExplanation(true);
    };

    const handleCheckReading = () => {
        const correctIndex = currentExercise.content.questions?.[0]?.correctIndex ?? 0;
        if (selectedAnswer === correctIndex) setIsCorrect(true);
        else setIsCorrect(false);
        setShowExplanation(true);
    };

    const handleCheckFillBlank = () => {
        const correctBlanks = currentExercise.content.blanks;
        let allCorrect = true;
        
        correctBlanks.forEach((blank: string, idx: number) => {
            if (blankValues[idx]?.toLowerCase().trim() !== blank.toLowerCase().trim()) {
                allCorrect = false;
            }
        });
        
        setIsCorrect(allCorrect);
        setShowExplanation(true);
    };

    const nextExercise = () => {
        setCurrentIndex(curr => curr + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setShowExplanation(false);
        setBlankValues({});
    };

    return (
        <div className="max-w-3xl mx-auto h-[80vh] flex flex-col pt-4">
            {/* Header / Progress bar */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                  onClick={() => router.push('/path')}
                  className="text-foreground/40 hover:text-foreground transition-colors"
                >
                    <XCircle className="w-7 h-7" />
                </button>
                <div className="flex-1 h-4 bg-border-glass rounded-full overflow-hidden relative">
                    <div 
                        className="absolute left-0 top-0 h-full bg-color-success-500 transition-all duration-500 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    />
                </div>
                <button className="text-foreground/40 hover:text-foreground">
                    <Flag className="w-5 h-5" />
                </button>
            </div>

            {/* Exercise Content Area */}
            <div className="flex-1 flex flex-col justify-center animate-in slide-in-from-right-8 duration-300 relative pb-32">
                
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                    {currentExercise.title}
                </h2>

                {/* READING TYPE */}
                {currentExercise.type === 'READING' && (
                    <div className="space-y-6">
                        <div className="bg-background/50 border border-border-glass p-6 rounded-2xl shadow-sm text-lg leading-relaxed whitespace-pre-wrap">
                            {currentExercise.content.text}
                        </div>
                        
                        <div className="font-bold text-xl mt-8 mb-4">
                            {currentExercise.content.questions?.[0]?.question}
                        </div>
                        
                        <div className="grid gap-3">
                            {currentExercise.content.questions?.[0]?.options.map((opt: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => !showExplanation && setSelectedAnswer(idx)}
                                    disabled={showExplanation}
                                    className={`
                                        w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg
                                        ${selectedAnswer === idx ? 'border-color-primary-500 bg-color-primary-50' : 'border-border-glass hover:border-color-primary-300 bg-background/50'}
                                        ${showExplanation && idx === currentExercise.content.questions[0].correctIndex ? 'border-color-success-500 bg-color-success-50 text-color-success-700' : ''}
                                        ${showExplanation && selectedAnswer === idx && !isCorrect ? 'border-color-danger-500 bg-color-danger-50 text-color-danger-700' : ''}
                                    `}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* GRAMMAR / FILL IN THE BLANK TYPE */}
                {currentExercise.type === 'GRAMMAR' && (
                    <div className="space-y-6">
                        <div className="text-xl md:text-2xl leading-relaxed font-medium bg-background border border-border-glass p-8 rounded-3xl text-center">
                            {currentExercise.content.text.split('[input]').map((part: string, index: number, arr: any[]) => (
                                <span key={index}>
                                    {part}
                                    {index < arr.length - 1 && (
                                        <input 
                                            type="text"
                                            disabled={showExplanation}
                                            value={blankValues[index] || ""}
                                            onChange={(e) => setBlankValues({...blankValues, [index]: e.target.value})}
                                            className={`
                                                inline-block w-32 border-b-4 text-center bg-transparent mx-2 focus:outline-none focus:border-color-primary-500 transition-colors
                                                ${showExplanation && isCorrect ? 'border-color-success-500 text-color-success-600 bg-color-success-50' : ''}
                                                ${showExplanation && !isCorrect ? 'border-color-danger-500 text-color-danger-600 bg-color-danger-50' : 'border-foreground/30 text-color-primary-600 bg-color-primary-50/50'}
                                            `}
                                        />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* QUIZ TYPE */}
                {currentExercise.type === 'QUIZ' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="w-24 h-24 shrink-0 bg-gradient-to-tr from-color-primary-400 to-color-accent-400 rounded-2xl flex items-center justify-center p-1 shadow-lg">
                                <div className="w-full h-full bg-background rounded-[14px] flex items-center justify-center">
                                    <BookOpen className="w-8 h-8 text-color-primary-500" />
                                </div>
                            </div>
                            <div className="w-full">
                                <h3 className="text-2xl font-bold mb-6">
                                    {currentExercise.content.questions?.[0]?.prompt}
                                </h3>
                                
                                <div className="grid gap-3 w-full">
                                    {currentExercise.content.questions?.[0]?.options.map((opt: string, idx: number) => (
                                        <button
                                            key={idx}
                                            onClick={() => !showExplanation && setSelectedAnswer(idx)}
                                            disabled={showExplanation}
                                            className={`
                                                w-full text-left p-4 rounded-xl border-2 transition-all font-medium text-lg
                                                ${selectedAnswer === idx ? 'border-color-primary-500 bg-color-primary-50' : 'border-border-glass hover:border-color-primary-300 bg-background/50'}
                                                ${showExplanation && idx === currentExercise.content.questions[0].correctAnswer ? 'border-color-success-500 bg-color-success-50 text-color-success-700' : ''}
                                                ${showExplanation && selectedAnswer === idx && !isCorrect ? 'border-color-danger-500 bg-color-danger-50 text-color-danger-700' : ''}
                                            `}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SPEAKING TYPE */}
                {currentExercise.type === 'SPEAKING' && (
                    <div className="space-y-12 text-center h-full flex flex-col justify-center items-center pb-12">
                        <p className="text-2xl font-medium max-w-lg mx-auto leading-relaxed">
                            {currentExercise.content.prompt}
                        </p>
                        
                        <div className="bg-color-primary-50 px-6 py-4 rounded-2xl flex gap-2 flex-wrap justify-center border border-color-primary-100">
                             <span className="font-bold mr-2 text-color-primary-800">Target words: </span>
                             {currentExercise.content.targetKeywords?.map((kw: string) => (
                                 <span key={kw} className="bg-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-sm">{kw}</span>
                             ))}
                        </div>

                        <button 
                            className={`
                                w-32 h-32 rounded-full border-4 flex items-center justify-center text-white transition-all shadow-xl
                                ${showExplanation ? 'bg-color-success-500 border-color-success-300' : 'bg-color-secondary-500 border-color-secondary-300 hover:scale-110 active:scale-95'}
                            `}
                            onClick={() => {
                                // Mock speech recognition check for the MVP path
                                setTimeout(() => {
                                    setIsCorrect(true);
                                    setShowExplanation(true);
                                }, 1500)
                            }}
                        >
                            <Mic className="w-12 h-12" />
                        </button>
                        <p className="text-foreground/50 font-bold tracking-wider text-sm uppercase">Tap to simulate Speaking</p>
                    </div>
                )}
            </div>

            {/* Bottom Checking Action Bar - Fixed to viewport */}
            <div className={`
                fixed bottom-0 left-0 w-full p-4 md:p-8 border-t-2 transition-colors z-50
                ${showExplanation && isCorrect ? 'bg-color-success-100 border-color-success-200' : ''}
                ${showExplanation && !isCorrect ? 'bg-color-danger-100 border-color-danger-200' : ''}
                ${!showExplanation ? 'bg-background border-border-glass' : ''}
            `}>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
                    
                    <div className="flex-1">
                        {showExplanation && isCorrect !== null && (
                            <div className="animate-in slide-in-from-bottom-2 fade-in">
                                <h3 className={`font-black text-2xl flex items-center gap-2 ${isCorrect ? 'text-color-success-600' : 'text-color-danger-600'}`}>
                                    {isCorrect ? <CheckCircle className="w-8 h-8 fill-color-success-500 text-white" /> : <XCircle className="w-8 h-8 fill-color-danger-500 text-white" />}
                                    {isCorrect ? 'Excellent!' : 'Not quite.'}
                                </h3>
                                
                                {(!isCorrect && currentExercise.type === 'GRAMMAR') && (
                                     <p className="text-color-danger-700 mt-2 font-bold text-lg">
                                         Correct answer: {currentExercise.content.blanks.join(", ")}
                                     </p>
                                )}
                                {currentExercise.content.questions?.[0]?.explanation && (
                                    <p className={`mt-2 font-bold text-lg ${isCorrect ? 'text-color-success-700' : 'text-color-danger-700'}`}>
                                        {currentExercise.content.questions[0].explanation}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="shrink-0 flex w-full md:w-auto">
                        {!showExplanation ? (
                            <button 
                                onClick={
                                    currentExercise.type === 'READING' ? handleCheckReading :
                                    currentExercise.type === 'QUIZ' ? handleCheckQuiz :
                                    currentExercise.type === 'GRAMMAR' ? handleCheckFillBlank :
                                    nextExercise
                                }
                                disabled={
                                    ((currentExercise.type === 'READING' || currentExercise.type === 'QUIZ') && selectedAnswer === null) || 
                                    (currentExercise.type === 'SPEAKING')
                                }
                                className="w-full md:w-auto bg-color-primary-600 disabled:bg-border-glass disabled:text-foreground/40 hover:bg-color-primary-500 text-white font-black text-lg px-12 py-4 rounded-2xl transition-all shadow-lg shadow-color-primary-500/20 active:scale-95"
                            >
                                Check
                            </button>
                        ) : (
                            <button 
                                onClick={nextExercise}
                                className={`
                                    w-full md:w-auto font-black text-lg px-12 py-4 rounded-2xl transition-all shadow-lg active:scale-95 text-white
                                    ${isCorrect ? 'bg-color-success-600 hover:bg-color-success-500 shadow-color-success-500/20' : 'bg-color-danger-600 hover:bg-color-danger-500 shadow-color-danger-500/20'}
                                `}
                            >
                                Continue
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
