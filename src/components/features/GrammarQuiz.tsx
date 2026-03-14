"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, Lightbulb } from "lucide-react";

export default function GrammarQuiz() {
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const availableWords = ["been", "have", "I", "working", "here", "for", "years", "5"];
  const correctOrder = ["I", "have", "been", "working", "here", "for", "5", "years"];

  const handleWordSelect = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleWordRemove = (word: string) => {
    setSelectedWords(selectedWords.filter(w => w !== word));
  };

  const handleCheck = () => {
    setIsChecking(true);
    const correct = selectedWords.join(" ") === correctOrder.join(" ");
    setIsCorrect(correct);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 animate-in fade-in">
      
      <div className="flex items-center gap-3 mb-6">
         <div className="p-2 bg-color-secondary-100 text-color-secondary-600 rounded-xl">
           <AlertCircle className="w-6 h-6" />
         </div>
         <div>
           <h2 className="text-2xl font-display font-bold text-foreground">Sentence Builder</h2>
           <p className="text-foreground/60 text-sm">Present Perfect Continuous</p>
         </div>
      </div>

      <div className="glass rounded-3xl p-6 md:p-8 space-y-8 shadow-xl relative overflow-hidden">
        
        {/* Instruction */}
        <div>
          <h3 className="text-lg font-bold text-foreground mb-1">Translate this sentence:</h3>
          <p className="text-xl text-color-primary-600 font-medium">"He estado trabajando aquí por 5 años."</p>
        </div>

        {/* Drop Zone (Selected Words) */}
        <div className="w-full min-h-[100px] border-b-2 border-border-glass pb-4 flex flex-wrap gap-2 items-start">
          {selectedWords.length === 0 && (
            <span className="text-foreground/30 font-medium italic mt-2">Tap words to build the sentence...</span>
          )}
          {selectedWords.map((word, i) => (
            <button
              key={`selected-${i}-${word}`}
              onClick={() => handleWordRemove(word)}
              className="px-4 py-2 bg-background border border-border-glass rounded-xl shadow-sm text-foreground font-medium hover:bg-color-danger-50 hover:text-color-danger-500 hover:border-color-danger-200 transition-all animate-in zoom-in duration-200"
            >
              {word}
            </button>
          ))}
        </div>

        {/* Word Bank (Available Options) */}
        <div className="flex flex-wrap gap-3 justify-center">
          {availableWords.map((word, i) => {
            const isSelected = selectedWords.includes(word);
            return (
              <button
                key={`bank-${i}-${word}`}
                onClick={() => handleWordSelect(word)}
                disabled={isSelected}
                className={`px-4 py-2 rounded-xl border transition-all duration-200 font-medium ${
                  isSelected 
                  ? "bg-border-glass border-transparent text-transparent shadow-inner pointer-events-none" 
                  : "bg-white dark:bg-background/80 border-border-glass text-foreground hover:-translate-y-1 hover:shadow-md hover:border-color-primary-300"
                }`}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI Grammar Tip */}
      <div className="bg-color-primary-50 border border-color-primary-100 rounded-2xl p-4 flex gap-4">
        <Lightbulb className="w-6 h-6 text-color-primary-500 shrink-0 mt-0.5" />
        <div>
           <h4 className="font-bold text-color-primary-900 text-sm mb-1">AI Tutor Tip</h4>
           <p className="text-sm text-color-primary-800/80">
             Use <strong>have been + verb(-ing)</strong> for actions that started in the past and are still continuing now.
           </p>
        </div>
      </div>

      {/* Check Action */}
      <div className="flex flex-col gap-4">
        {isCorrect !== null && (
          <div className={`p-4 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 ${isCorrect ? "bg-color-success-50 text-color-success-700 border border-color-success-200" : "bg-color-danger-50 text-color-danger-700 border border-color-danger-200"}`}>
            {isCorrect ? <CheckCircle2 className="w-6 h-6 shrink-0" /> : <XCircle className="w-6 h-6 shrink-0" />}
            <span className="font-bold">{isCorrect ? "Excellent! That is perfectly correct." : "Not quite. Check the word order."}</span>
          </div>
        )}

        <button 
          onClick={handleCheck}
          disabled={selectedWords.length === 0}
          className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${
            selectedWords.length === 0 
            ? "bg-border-glass text-foreground/40 cursor-not-allowed" 
            : isCorrect 
              ? "bg-color-success-500 text-white hover:bg-color-success-600 shadow-lg shadow-color-success-500/20"
              : "bg-color-primary-600 text-white hover:bg-color-primary-500 shadow-lg shadow-color-primary-500/20"
          }`}
        >
          {isCorrect ? (
            <>
              Next Challenge <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            "Check Sentence"
          )}
        </button>
      </div>

    </div>
  );
}
