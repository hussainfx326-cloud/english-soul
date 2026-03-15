import Leaderboard from "@/components/features/Leaderboard";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  // Fetch top 50 users based on totalXP (for MVP gamification)
  // In a real robust app, you'd fetch LeaderboardScore.weeklyXP
  // But we have xpProgress reliably populated right now for MVP.
  const rawRankings = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      image: true,
      xpProgress: { select: { totalXP: true } }
    },
    orderBy: {
      xpProgress: { totalXP: 'desc' }
    },
    take: 50
  });

  // Format the data for the UI component
  let rankParam = 1;
  const formattedRankings = rawRankings.map(r => ({
    id: r.id,
    rank: rankParam++,
    name: r.name || "Anonymous Learner",
    xp: r.xpProgress?.totalXP || 0,
    avatar: (r.name || "A")[0].toUpperCase(),
    isMe: r.id === session.user?.id,
    trend: Math.random() > 0.5 ? "up" : "same" // Add real trend logic later if needed
  }));

  return (
    <div className="py-4">
      <Leaderboard initialRankings={formattedRankings} />
    </div>
  );
}
