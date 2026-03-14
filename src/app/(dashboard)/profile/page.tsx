import { Settings, Award, Clock, Star, TrendingUp } from "lucide-react";

export default function ProfilePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">

            {/* Profile Header */}
            <section className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-color-primary-500/10 rounded-full blur-[60px]"></div>

                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-color-primary-500 to-color-accent-500 p-1">
                        <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-4 border-background overflow-hidden relative">
                            {/* Fallback Avatar Placeholder, ideally an image would go here */}
                            <span className="text-4xl font-display font-bold text-color-primary-600">A</span>
                        </div>
                    </div>

                    <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-3xl font-display font-bold text-foreground">Alex Johnson</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-color-accent-50 text-color-accent-600 text-sm font-bold border border-color-accent-200">
                                PRO Member
                            </span>
                        </div>
                        <p className="text-foreground/60 mb-4">Joined March 2026 • Native Language: Spanish</p>

                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <button className="px-5 py-2 rounded-xl bg-color-primary-50 text-color-primary-600 font-medium hover:bg-color-primary-100 transition-colors">
                                Edit Profile
                            </button>
                            <button className="p-2 rounded-xl border border-border-glass text-foreground/60 hover:text-foreground hover:bg-background transition-colors">
                                <Settings className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Progress & Stats Grid */}
            <section className="grid md:grid-cols-4 gap-4">
                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-secondary-50 text-color-secondary-500 mb-2">
                        <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">14</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Day Streak</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-primary-50 text-color-primary-500 mb-2">
                        <Star className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">2,450</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Total XP</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-success-50 text-color-success-500 mb-2">
                        <TrendingUp className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">B2</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Current Level</span>
                </div>

                <div className="glass rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2">
                    <div className="p-3 rounded-xl bg-color-accent-50 text-color-accent-500 mb-2">
                        <Clock className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-display font-bold text-foreground">42</span>
                    <span className="text-sm font-medium text-foreground/60 uppercase tracking-wider">Hours Learned</span>
                </div>
            </section>

            {/* Achievements Section */}
            <section className="glass rounded-3xl p-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
                        <Award className="w-6 h-6 text-color-primary-500" />
                        Recent Achievements
                    </h2>
                    <button className="text-color-primary-600 text-sm font-medium hover:underline">View All</button>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Achievement Card 1 */}
                    <div className="p-4 rounded-2xl border border-border-glass bg-background/50 flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-color-secondary-100 flex items-center justify-center shrink-0">
                            <span className="text-2xl">🔥</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">On Fire</h4>
                            <p className="text-xs text-foreground/60 mt-1">Maintained a 14-day learning streak.</p>
                        </div>
                    </div>

                    {/* Achievement Card 2 */}
                    <div className="p-4 rounded-2xl border border-border-glass bg-background/50 flex gap-4 items-start">
                        <div className="w-12 h-12 rounded-full bg-color-primary-100 flex items-center justify-center shrink-0">
                            <span className="text-2xl">🗣️</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">Smooth Talker</h4>
                            <p className="text-xs text-foreground/60 mt-1">Completed 10 speaking simulations.</p>
                        </div>
                    </div>

                    {/* Achievement Card 3 */}
                    <div className="p-4 rounded-2xl border border-border-glass bg-background/50 flex gap-4 items-start opacity-50 grayscale">
                        <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center shrink-0">
                            <span className="text-2xl text-foreground/40">📚</span>
                        </div>
                        <div>
                            <h4 className="font-bold text-foreground">Grammar Guru</h4>
                            <p className="text-xs text-foreground/60 mt-1">Complete all B2 grammar modules.</p>
                            <div className="mt-2 w-full h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                                <div className="h-full bg-color-primary-500 w-[60%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
// We need to import Flame since it's used in the Progress section
import { Flame } from "lucide-react";
