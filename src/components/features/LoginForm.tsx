"use client";
import { useActionState } from "react";
import { Mail, Lock, ArrowRight, Chrome } from "lucide-react";
import { loginWithCreds, loginWithGoogle } from "@/lib/actions/auth";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginWithCreds, undefined);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass rounded-2xl p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-color-primary-500 rounded-full blur-[80px] opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-color-accent-500 rounded-full blur-[80px] opacity-20"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Welcome Back</h2>
                        <p className="text-foreground/60 text-sm">Continue your journey to C3 fluency.</p>
                    </div>

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    className="w-full bg-background/50 border border-border-glass rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-color-primary-500 transition-all font-sans"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-medium text-foreground">Password</label>
                                <a href="#" className="text-xs text-color-primary-600 hover:text-color-primary-500 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="w-full bg-background/50 border border-border-glass rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-color-primary-500 transition-all font-sans"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {state?.error && (
                            <p className="text-color-danger-500 text-sm text-center font-medium bg-color-danger-50 p-2 rounded-md">
                                {state.error}
                            </p>
                        )}

                        <button 
                            type="submit" 
                            disabled={isPending}
                            className="w-full bg-gradient-to-r from-color-primary-600 to-color-accent-600 hover:from-color-primary-500 hover:to-color-accent-500 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 group transition-all mt-6 shadow-md hover:shadow-lg shadow-color-primary-500/20 disabled:opacity-50"
                        >
                            <span>{isPending ? "Signing in..." : "Sign In"}</span>
                            {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border-glass"></div>
                        <span className="text-xs text-foreground/40">OR</span>
                        <div className="h-px flex-1 bg-border-glass"></div>
                    </div>

                    <form action={loginWithGoogle}>
                        <button type="submit" className="w-full mt-6 bg-background border border-border-glass hover:bg-background/80 text-foreground rounded-xl py-3 font-medium flex items-center justify-center gap-2 transition-all">
                            <Chrome className="w-5 h-5" />
                            <span>Continue with Google</span>
                        </button>
                    </form>

                    <p className="text-center text-sm text-foreground/60 mt-8">
                        Don't have an account? <a href="/signup" className="text-color-primary-600 font-medium hover:underline">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
