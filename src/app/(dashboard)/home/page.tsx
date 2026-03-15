import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookOpen, Trophy, Flame, ChevronRight, PlayCircle, Target, Mic } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true, xpProgress: true, streaks: true }
    });

    if (!user) redirect("/login");

    const name = user.name || "Student";
    const firstName = name.split(" ")[0];
    const streak = user.streaks?.currentStreak || 0;
    const totalXP = user.xpProgress?.totalXP || 0;
    const currentLevel = user.profile?.currentLevel || "B1";
    const dailyGoal = user.profile?.dailyGoal || 15;
    
    // For MVP dashboard, assume they've studied 5 mins today
    const studiedToday = 5; 
    const completionPct = Math.min(100, (studiedToday / dailyGoal) * 100);
    const dashOffset = 251.2 - (251.2 * (completionPct / 100));

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Welcome Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold text-foreground">
                        Good morning, <span className="text-color-primary-600">{firstName}</span>!
                    </h1>
                    <p className="text-foreground/60">You're doing great. Let's reach your {dailyGoal}m daily goal.</p>
                </div>

                {/* Quick Stats */}
                <div className="flex items-center gap-3">
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                        <Flame className="w-5 h-5 text-color-secondary-500" />
                        <span className="font-bold text-foreground">{streak}</span>
                    </div>
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-color-primary-500" />
                        <span className="font-bold text-foreground">{totalXP} XP</span>
                    </div>
                </div>
            </div>

            {/* Hero Action: Next Lesson */}
            <section className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-color-primary-900 to-color-primary-600 text-white shadow-xl shadow-color-primary-500/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[40px] translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-color-accent-500/30 rounded-full blur-[30px] translate-y-1/2"></div>

                <div className="relative z-10 grid md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white/90 text-sm font-medium backdrop-blur-md border border-white/10">
                            <Target className="w-4 h-4" />
                            <span>Level {currentLevel} • Unit 1</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-display font-bold">Resume Your Path</h2>
                        <p className="text-white/80 max-w-md">
                            Continue your structured learning journey to master {currentLevel} fluency.
                        </p>

                        <Link href="/path" className="inline-block bg-white text-color-primary-900 font-bold px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-white/90 transition-colors mt-2 shadow-lg w-max">
                            <PlayCircle className="w-5 h-5" />
                            <span>Continue Learning</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Dashboard Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {/* Daily Progress */}
                <div className="glass rounded-3xl p-6">
                    <h3 className="font-display font-bold text-xl mb-6">Daily Goal</h3>
                    <div className="relative w-40 h-40 mx-auto">
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" className="stroke-border-glass fill-none" strokeWidth="8" />
                            <circle
                                cx="50" cy="50" r="40"
                                className="stroke-color-primary-500 fill-none"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray="251.2"
                                strokeDashoffset={dashOffset}
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold font-display text-foreground">{studiedToday}</span>
                            <span className="text-xs text-foreground/50 font-medium">/ {dailyGoal} MINS</span>
                        </div>
                    </div>
                </div>

                {/* Recommended Practice */}
                <div className="md:col-span-2 space-y-4">
                    <h3 className="font-display font-bold text-xl mb-2">Practice Tools</h3>

                    <Link href="/tutor" className="group glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-color-primary-500/30">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-color-accent-500/10 text-color-accent-600 flex items-center justify-center">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground group-hover:text-color-primary-600 transition-colors">AI Grammar Tutor</h4>
                                <p className="text-sm text-foreground/60">Chat with GPT-4 to fix your grammar mistakes.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:text-color-primary-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>

                    <Link href="/lab" className="group glass p-4 rounded-2xl flex items-center justify-between hover:bg-white/50 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-color-primary-500/30">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-color-success-500/10 text-color-success-500 flex items-center justify-center">
                                <Mic className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-foreground group-hover:text-color-primary-600 transition-colors">Speaking Lab</h4>
                                <p className="text-sm text-foreground/60">Practice pronunciation with Whisper AI.</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-foreground/30 group-hover:text-color-primary-500 transform group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
