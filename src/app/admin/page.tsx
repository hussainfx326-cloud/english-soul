"use client";

import { Users, BookOpen, Activity, AlertTriangle, TrendingUp, DollarSign } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Users", value: "24,592", trend: "+12%", icon: Users, color: "text-color-primary-500", bg: "bg-color-primary-50" },
    { label: "Active Subs", value: "3,104", trend: "+5%", icon: DollarSign, color: "text-color-success-500", bg: "bg-color-success-50" },
    { label: "Lessons Taken", value: "142k", trend: "+18%", icon: BookOpen, color: "text-color-accent-500", bg: "bg-color-accent-50" },
    { label: "AI API Errors", value: "12", trend: "-2", icon: AlertTriangle, color: "text-color-danger-500", bg: "bg-color-danger-50" },
  ];

  return (
    <div className="w-full h-full min-h-screen bg-background text-foreground animate-in fade-in">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-border-glass px-6 flex items-center justify-between bg-white dark:bg-background">
        <div className="flex items-center gap-3">
          <div className="bg-foreground text-background font-display font-bold px-2 py-1 rounded-md text-sm">ES</div>
          <span className="font-bold hidden sm:inline-block">Admin Console</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm">English Soul v1.0 • System: <span className="text-color-success-500 font-bold">Healthy</span></span>
           <div className="w-8 h-8 rounded-full bg-color-primary-600 text-white flex items-center justify-center font-bold text-xs">A</div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-border-glass bg-background p-4 hidden md:block">
           <nav className="space-y-1">
             <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-color-primary-50 text-color-primary-700 font-medium">
               <Activity className="w-5 h-5" /> Overview
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/60 hover:bg-foreground/5 hover:text-foreground font-medium transition-colors">
               <Users className="w-5 h-5" /> User Management
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-foreground/60 hover:bg-foreground/5 hover:text-foreground font-medium transition-colors">
               <BookOpen className="w-5 h-5" /> Content CMS
             </button>
           </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold">Platform Overview</h1>
            <p className="text-foreground/60">Real-time statistics for English Soul.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => {
               const Icon = stat.icon;
               return (
                 <div key={i} className="glass border border-border-glass rounded-2xl p-6 shadow-sm">
                   <div className="flex justify-between items-start mb-4">
                     <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                       <Icon className="w-6 h-6" />
                     </div>
                     <span className="text-xs font-bold text-color-success-500 bg-color-success-50 px-2 py-1 rounded-full flex items-center gap-1">
                       <TrendingUp className="w-3 h-3" /> {stat.trend}
                     </span>
                   </div>
                   <div>
                     <h3 className="text-3xl font-display font-bold text-foreground mb-1">{stat.value}</h3>
                     <p className="text-sm font-medium text-foreground/50">{stat.label}</p>
                   </div>
                 </div>
               );
            })}
          </div>

          {/* CMS Preview Table */}
          <div className="glass border border-border-glass rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border-glass flex items-center justify-between">
              <h2 className="text-xl font-bold">Recent Content Updates</h2>
              <button className="px-4 py-2 bg-foreground text-background rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
                + Create Lesson
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-foreground/5 text-sm">
                    <th className="p-4 font-bold text-foreground/60 uppercase tracking-wider">Module</th>
                    <th className="p-4 font-bold text-foreground/60 uppercase tracking-wider">Level</th>
                    <th className="p-4 font-bold text-foreground/60 uppercase tracking-wider">Status</th>
                    <th className="p-4 font-bold text-foreground/60 uppercase tracking-wider">Author</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-glass text-sm">
                  <tr className="hover:bg-foreground-[0.02] transition-colors">
                    <td className="p-4 font-medium text-foreground">B2 Business Negotiations</td>
                    <td className="p-4"><span className="bg-color-primary-50 text-color-primary-700 px-2 py-1 rounded-md font-bold text-xs">B2</span></td>
                    <td className="p-4"><span className="bg-color-success-50 text-color-success-600 px-2 py-1 rounded-full text-xs font-bold before:content-['●'] before:mr-1">Published</span></td>
                    <td className="p-4 text-foreground/60">AI Generator</td>
                  </tr>
                  <tr className="hover:bg-foreground-[0.02] transition-colors">
                    <td className="p-4 font-medium text-foreground">C1 Legal English Vocab</td>
                    <td className="p-4"><span className="bg-color-accent-50 text-color-accent-700 px-2 py-1 rounded-md font-bold text-xs">C1</span></td>
                    <td className="p-4"><span className="bg-color-secondary-50 text-color-secondary-600 px-2 py-1 rounded-full text-xs font-bold before:content-['●'] before:mr-1">Draft</span></td>
                    <td className="p-4 text-foreground/60">Alex J.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
