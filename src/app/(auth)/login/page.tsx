"use client";

import LoginForm from "@/components/features/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-color-primary-50 to-transparent -z-10"></div>

            {/* Brand Header */}
            <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-tr from-color-primary-600 to-color-accent-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform rotate-3">
                    <span className="text-white text-3xl font-display font-bold -rotate-3">E</span>
                    <span className="text-white text-3xl font-display font-bold -rotate-3">S</span>
                </div>
                <h1 className="text-4xl font-display font-bold text-foreground tracking-tight">English Soul</h1>
                <p className="text-color-primary-600 font-medium mt-1">Master. Speak. Connect.</p>
            </div>

            {/* Auth Form */}
            <LoginForm />
        </div>
    );
}
