"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Mic, MessageSquare, Trophy, User, LogOut } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Home", href: "/home", icon: Home },
        { name: "Learning Path", href: "/path", icon: BookOpen },
        { name: "AI Tutor", href: "/tutor", icon: MessageSquare },
        { name: "Speaking Lab", href: "/speaking", icon: Mic },
        { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
        { name: "Profile", href: "/profile", icon: User },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 h-screen border-r border-border-glass bg-background/50 backdrop-blur-xl sticky top-0 py-6 px-4">
                <div className="flex items-center gap-3 px-2 mb-10">
                    <div className="w-10 h-10 bg-gradient-to-tr from-color-primary-600 to-color-accent-500 rounded-xl flex items-center justify-center shadow-md shadow-color-primary-500/20 transform -rotate-3">
                        <span className="text-white font-display font-bold text-xl rotate-3">ES</span>
                    </div>
                    <span className="text-xl font-display font-bold text-foreground tracking-tight">English Soul</span>
                </div>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all ${isActive
                                        ? "bg-color-primary-50 text-color-primary-600 shadow-sm"
                                        : "text-foreground/60 hover:bg-background hover:text-foreground"
                                    }`}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? "text-color-primary-600" : ""}`} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-3">
                    <button className="flex items-center gap-3 w-full py-3 text-foreground/50 hover:text-color-danger-500 transition-colors font-medium">
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Bottom Tab Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 w-full glass border-t border-border-glass py-2 px-4 z-50 pb-safe">
                <ul className="flex justify-between items-center">
                    {navItems.slice(0, 5).map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <li key={item.name}>
                                <Link href={item.href} className="flex flex-col items-center gap-1 p-2">
                                    <div className={`p-1.5 rounded-full transition-all ${isActive ? "bg-color-primary-100 text-color-primary-600" : "text-foreground/40"}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className={`text-[10px] font-medium ${isActive ? "text-color-primary-600" : "text-foreground/40"}`}>
                                        {item.name.split(" ")[0]}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
}
