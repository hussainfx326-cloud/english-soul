"use client";

import { useActionState } from "react";
import { Mail, Lock, ArrowRight, User as UserIcon } from "lucide-react";
import { signUpUser } from "@/lib/actions/auth";

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(signUpUser, undefined);

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="glass rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-color-secondary-500 rounded-full blur-[80px] opacity-20"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-color-accent-500 rounded-full blur-[80px] opacity-20"></div>

                <div className="relative z-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-display font-bold text-foreground mb-2">Create Account</h2>
                        <p className="text-foreground/60 text-sm">Join the English Soul community.</p>
                    </div>

                    <form action={formAction} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-foreground">Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 w-5 h-5" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    className="w-full bg-background/50 border border-border-glass rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-color-primary-500 transition-all font-sans"
                                    placeholder="Alex Johnson"
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-foreground">Password</label>
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
                        {state?.success && (
                            <p className="text-color-success-500 text-sm text-center font-medium bg-color-success-50 p-2 rounded-md">
                                Success! Redirecting...
                            </p>
                        )}

                        <button 
                          type="submit" 
                          disabled={isPending}
                          className="w-full bg-gradient-to-r from-color-secondary-600 to-color-accent-600 hover:from-color-secondary-500 hover:to-color-accent-500 text-white rounded-xl py-3 font-medium flex items-center justify-center gap-2 group transition-all mt-6 shadow-md hover:shadow-lg disabled:opacity-50"
                        >
                            <span>{isPending ? "Creating..." : "Sign Up"}</span>
                            {!isPending && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <p className="text-center text-sm text-foreground/60 mt-8">
                        Already have an account? <a href="/login" className="text-color-primary-600 font-medium hover:underline">Sign in</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
