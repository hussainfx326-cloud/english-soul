"use client";

import { Trophy, Shield, Medal, Star, ShieldAlert, ArrowUpCircle, ArrowDownCircle } from "lucide-react";

export default function Leaderboard() {
  const currentLeague = "Gold League";
  
  const rankings = [
    { rank: 1, name: "Maria Garcia", xp: 4500, avatar: "M", isMe: false, trend: "up" },
    { rank: 2, name: "David Chen", xp: 4120, avatar: "D", isMe: false, trend: "same" },
    { rank: 3, name: "Alex (You)", xp: 3850, avatar: "A", isMe: true, trend: "up" },
    { rank: 4, name: "Sarah Smith", xp: 3500, avatar: "S", isMe: false, trend: "down" },
    { rank: 5, name: "Yuki Tanaka", xp: 3420, avatar: "Y", isMe: false, trend: "up" },
    { rank: 6, name: "Ahmed Hassan", xp: 3100, avatar: "AH", isMe: false, trend: "same" },
    { rank: 7, name: "Elena R.", xp: 2900, avatar: "E", isMe: false, trend: "down" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* League Header */}
      <div className="glass rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center">
         <div className="absolute top-0 right-1/4 w-40 h-40 bg-color-secondary-500/20 rounded-full blur-[50px]"></div>
         <div className="absolute bottom-0 left-1/4 w-40 h-40 bg-color-primary-500/20 rounded-full blur-[50px]"></div>
         
         <div className="relative z-10 space-y-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-color-secondary-600 to-color-secondary-400 p-1 shadow-xl shadow-color-secondary-500/30">
               <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-4 border-background">
                 <Shield className="w-12 h-12 text-color-secondary-500 fill-current" />
               </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">{currentLeague}</h1>
              <p className="text-foreground/60 max-w-sm mx-auto mt-2">Top 5 advance to the Sapphire League. Bottom 5 demoted to Silver.</p>
            </div>

            <div className="flex items-center justify-center gap-6 mt-4">
               <div className="text-center">
                 <span className="text-2xl font-bold font-display text-foreground block">3d 14h</span>
                 <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Time Left</span>
               </div>
               <div className="w-px h-10 bg-border-glass"></div>
               <div className="text-center">
                 <span className="text-2xl font-bold font-display text-color-primary-600 block">Top 3</span>
                 <span className="text-xs font-bold text-foreground/40 uppercase tracking-wider">Promotion Zone</span>
               </div>
            </div>
         </div>
      </div>

      {/* Rankings List */}
      <div className="glass rounded-3xl overflow-hidden border border-border-glass">
         <div className="p-4 border-b border-border-glass flex items-center justify-between bg-foreground/5">
            <h3 className="font-bold text-foreground">Weekly Rankings</h3>
            <span className="text-sm font-medium text-foreground/60 flex items-center gap-1">
              <Trophy className="w-4 h-4 text-color-secondary-500" /> Season 4
            </span>
         </div>

         <div className="divide-y divide-border-glass">
            {rankings.map((user, index) => {
               
               let rankIcon = null;
               if (user.rank === 1) rankIcon = <Medal className="w-6 h-6 text-color-secondary-500 fill-current drop-shadow-md" />;
               else if (user.rank === 2) rankIcon = <Medal className="w-6 h-6 text-slate-400 fill-current drop-shadow-md" />;
               else if (user.rank === 3) rankIcon = <Medal className="w-6 h-6 text-amber-700 fill-current drop-shadow-md" />;
               else rankIcon = <span className="font-bold text-foreground text-lg w-6 text-center">{user.rank}</span>;

               const isPromotionZone = user.rank <= 5;
               
               return (
                 <div 
                   key={user.name}
                   className={`p-4 flex items-center gap-4 transition-colors ${
                     user.isMe 
                     ? "bg-color-primary-50/50 dark:bg-color-primary-900/10 border-l-4 border-color-primary-500 relative" 
                     : "hover:bg-foreground/5"
                   }`}
                 >
                    {/* Promotion Zone Indicator Line */}
                    {user.rank === 5 && (
                       <div className="absolute -bottom-px left-0 w-full border-b-[2px] border-dashed border-color-success-500/50 z-10"></div>
                    )}
                    {user.rank === rankings.length - 2 && (
                       <div className="absolute -bottom-px left-0 w-full border-b-[2px] border-dashed border-color-danger-500/50 z-10"></div>
                    )}

                    <div className="w-8 shrink-0 flex justify-center">
                      {rankIcon}
                    </div>

                    <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center text-white font-bold text-lg shadow-inner ${
                      user.isMe ? "bg-color-primary-500" : "bg-gradient-to-br from-slate-400 to-slate-500"
                    }`}>
                      {user.avatar}
                    </div>

                    <div className="flex-1 font-medium">
                       <span className={`block text-lg ${user.isMe ? "text-color-primary-700 dark:text-color-primary-400 font-bold" : "text-foreground"}`}>
                         {user.name}
                       </span>
                    </div>

                    <div className="flex items-center gap-6">
                       {/* Trend */}
                       <div className="hidden sm:block">
                          {user.trend === "up" && <ArrowUpCircle className="w-5 h-5 text-color-success-500" />}
                          {user.trend === "down" && <ArrowDownCircle className="w-5 h-5 text-color-danger-500" />}
                          {user.trend === "same" && <div className="w-5 h-5 rounded-full border-2 border-border-glass"></div>}
                       </div>
                       
                       {/* XP */}
                       <div className="text-right">
                          <span className="font-display font-bold text-lg text-foreground block leading-none">{user.xp.toLocaleString()}</span>
                          <span className="text-xs text-foreground/50 font-bold tracking-wider">XP</span>
                       </div>
                    </div>
                 </div>
               );
            })}
         </div>
      </div>

    </div>
  );
}
