import { Flame, Award, Clock, Star, TrendingUp } from "lucide-react";
import ProfileForm from "@/components/features/ProfileForm";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true, xpProgress: true, streaks: true }
    });

    if (!user) redirect("/login");

    const name = user.name || "User";
    const initial = name.charAt(0).toUpperCase();
    const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });
    const language = user.profile?.nativeLanguage?.toUpperCase() || "ES";
    const streak = user.streaks?.currentStreak || 0;
    const totalXP = user.xpProgress?.totalXP || 0;
    const currentLevel = user.profile?.currentLevel || "B1";
    // Rough estimate: 100 XP = 1 hour learned
    const hoursLearned = Math.floor(totalXP / 100);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            {/* Profile Header */}
            <section className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-color-primary-500/10 rounded-full blur-[60px]"></div>

                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10 w-full">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-color-primary-500 to-color-accent-500 p-1 shrink-0">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-4 border-background overflow-hidden relative">
                            <span className="text-4xl font-display font-bold text-color-primary-600">{initial}</span>
                        </div>
                    </div>

                    <div className="text-left flex-1 w-full">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-3xl font-display font-bold text-foreground">{name}</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-color-accent-50 text-color-accent-600 text-sm font-bold border border-color-accent-200">
                                {currentLevel} Learner
                            </span>
                        </div>
                        <p className="text-foreground/60 mb-2">Joined {joinedDate} • Native: {language}</p>
                        <p className="text-foreground/80 font-medium mb-4">Goal: {user.profile?.learningGoal || "General Fluency"}</p>

                        <ProfileForm user={user} />
                    </div>
                </div>
            </section>

            {/* Progress & Stats Grid */}
            <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-secondary-50 text-color-secondary-500 mb-2">
                        <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">{streak}</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Day Streak</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-primary-50 text-color-primary-500 mb-2">
                        <Star className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">{totalXP}</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Total XP</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-success-50 text-color-success-500 mb-2">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">{currentLevel}</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Current Level</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-accent-50 text-color-accent-500 mb-2">
                        <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">{hoursLearned}</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Hours Learned</span>
                </div>
            </section>
        </div>
    );
}
