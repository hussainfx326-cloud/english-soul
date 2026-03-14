"use client";

import SignupForm from "@/components/features/SignupForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-color-secondary-50 to-transparent -z-10"></div>

            {/* Brand Header */}
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-color-secondary-600 to-color-accent-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform -rotate-3">
                    <span className="text-white text-3xl font-display font-bold rotate-3">E</span>
                    <span className="text-white text-3xl font-display font-bold rotate-3">S</span>
                </div>
                <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">English Soul</h1>
                <p className="text-color-secondary-600 font-medium mt-1">Start your journey.</p>
            </div>

            {/* Auth Form */}
            <SignupForm />
        </div>
    );
}
