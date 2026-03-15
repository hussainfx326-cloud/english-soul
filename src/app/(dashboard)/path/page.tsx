import { Lock, Star, CheckCircle, BookOpen } from "lucide-react";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function PathPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: { profile: true }
    });

    const userLevel = user?.profile?.currentLevel || "B1";

    // Fetch courses with units and lessons
    const courses = await prisma.course.findMany({
        orderBy: { level: 'asc' },
        include: {
            units: {
                orderBy: { order: 'asc' },
                include: {
                    lessons: {
                        orderBy: { order: 'asc' }
                    }
                }
            }
        }
    });

    return (
        <div className="space-y-12 animate-in fade-in max-w-2xl mx-auto pb-20">

            <div className="text-center space-y-2 mb-12">
                <h1 className="text-4xl font-display font-bold text-foreground">Your Journey</h1>
                <p className="text-foreground/60">Follow the path to English mastery.</p>
            </div>

            {courses.length === 0 ? (
                <div className="text-center p-8 glass rounded-2xl">
                    <p className="text-foreground/60">Curriculum is being generated... Please check back later.</p>
                </div>
            ) : (
                courses.map((course) => {
                    const isUnlocked = course.level <= userLevel;

                    return (
                        <div key={course.id} className="mb-16">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-glass">
                                <div>
                                    <h2 className="text-2xl font-display font-bold text-foreground">{course.title}</h2>
                                    <p className="text-foreground/60">{course.description}</p>
                                </div>
                                {!isUnlocked && <Lock className="w-6 h-6 text-foreground/40" />}
                            </div>

                            <div className="relative space-y-20">
                                {/* The Connection Line */}
                                <div className="absolute left-1/2 top-4 bottom-4 w-2 -translate-x-1/2 bg-border-glass rounded-full -z-10">
                                    {isUnlocked && <div className="w-full bg-gradient-to-b from-color-success-500 to-color-primary-500 rounded-full" style={{ height: "40%" }}></div>}
                                </div>

                                {course.units.map((unit, index) => {
                                    // For MVP, randomly assign states based on ID/index for visual flair until progress tracking is detailed
                                    const isCompleted = isUnlocked && index === 0;
                                    const isCurrent = isUnlocked && index === 1;
                                    const isLocked = !isUnlocked || index > 1;

                                    return (
                                        <div key={unit.id} className={`relative flex items-center justify-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                            {/* Content Card */}
                                            <div className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}>
                                                <div className={`glass p-5 rounded-3xl inline-block text-left w-full transition-all ${isCurrent ? "scale-105 border-color-primary-500 shadow-xl shadow-color-primary-500/20" : isCompleted ? "opacity-90" : "opacity-60 bg-background/30"}`}>
                                                    <h3 className="font-display font-bold text-lg text-foreground flex flex-col md:flex-row md:items-center gap-2">
                                                        <span>Unit {unit.order}: {unit.title}</span>
                                                        {isCompleted && <CheckCircle className="w-4 h-4 text-color-success-500" />}
                                                    </h3>
                                                    <p className="text-sm text-foreground/60 mt-1">{unit.description}</p>
                                                    <p className="text-xs font-bold text-color-primary-500 mt-2">{unit.lessons.length} Lessons</p>

                                                    {isCurrent && (
                                                        <Link href={`/lesson/${unit.lessons[0]?.id || "empty"}`} className="block text-center mt-4 w-full bg-color-primary-600 hover:bg-color-primary-500 text-white font-bold py-2 rounded-xl transition-colors">
                                                            Continue
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Center Node */}
                                            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 border-background shadow-lg transition-transform hover:scale-110 cursor-pointer ${isCurrent ? "bg-color-primary-500 scale-110" : isCompleted ? "bg-color-success-500" : "bg-border-glass text-foreground/40"}`}>
                                                    {isCompleted ? <Star className="w-7 h-7 text-white" /> : isCurrent ? <BookOpen className="w-7 h-7 text-white" /> : <Lock className="w-6 h-6" />}
                                                </div>
                                            </div>

                                            <div className="w-5/12"></div>
                                        </div>
                                    );
                                })}
                                
                                {course.units.length === 0 && (
                                     <div className="text-center text-foreground/50 py-4">Coming soon...</div>
                                )}
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}
