import { Lock, Star, CheckCircle, BookOpen } from "lucide-react";

export default function PathPage() {
    const levels = [
        { id: "b1", title: "Intermediate (B1)", description: "Daily conversations & travel", status: "completed" },
        { id: "b2", title: "Upper Intermediate (B2)", description: "Professional routines & reasoning", status: "current" },
        { id: "c1", title: "Advanced (C1)", description: "Fluid abstract discussions", status: "locked" },
        { id: "c2", title: "Mastery (C2)", description: "Native-like accuracy", status: "locked" },
        { id: "c3", title: "Elite (C3)", description: "Domain-specific fluency", status: "locked" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in max-w-2xl mx-auto pb-20">

            <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl font-display font-bold text-foreground">Your Journey</h1>
                <p className="text-foreground/60">Follow the path to English mastery.</p>
            </div>

            <div className="relative space-y-16">
                {/* The Connection Line */}
                <div className="absolute left-1/2 top-4 bottom-4 w-2 -translate-x-1/2 bg-border-glass rounded-full -z-10">
                    {/* Active Progress Line */}
                    <div className="w-full bg-gradient-to-b from-color-success-500 to-color-primary-500 rounded-full" style={{ height: "35%" }}></div>
                </div>

                {levels.map((level, index) => {
                    const isCompleted = level.status === "completed";
                    const isCurrent = level.status === "current";

                    return (
                        <div key={level.id} className={`relative flex items-center justify-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>

                            {/* Content Card */}
                            <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                                <div className={`glass p-5 rounded-3xl inline-block text-left w-full transition-all ${isCurrent ? "scale-105 border-color-primary-500 shadow-xl shadow-color-primary-500/20" : isCompleted ? "opacity-90" : "opacity-60 bg-background/30"}`}>
                                    <h3 className="font-display font-bold text-lg text-foreground flex items-center gap-2">
                                        {level.title}
                                        {isCompleted && <CheckCircle className="w-4 h-4 text-color-success-500" />}
                                    </h3>
                                    <p className="text-sm text-foreground/60 mt-1">{level.description}</p>

                                    {isCurrent && (
                                        <button className="mt-4 w-full bg-color-primary-600 hover:bg-color-primary-500 text-white font-bold py-2 rounded-xl transition-colors">
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Center Node */}
                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-lg transition-transform ${isCurrent ? "bg-color-primary-500 scale-110" : isCompleted ? "bg-color-success-500" : "bg-border-glass text-foreground/40"}`}>
                                    {isCompleted ? <Star className="w-7 h-7 text-white" /> : isCurrent ? <BookOpen className="w-7 h-7 text-white" /> : <Lock className="w-6 h-6" />}
                                </div>
                            </div>

                            <div className="w-5/12"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
