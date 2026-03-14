import prisma from "./prisma";

// XP Thresholds for Levels (e.g. Level 1 -> 2 requires 500 XP)
const XP_PER_LEVEL = 500;

export async function processGamificationEngine(userId: string, xpEarned: number) {
  try {
    // 1. Update XP and Calculate Level
    const currentXP = await prisma.xPProgress.upsert({
      where: { userId },
      update: {
        totalXP: { increment: xpEarned },
        lastUpdated: new Date(),
      },
      create: {
        userId,
        totalXP: xpEarned,
        level: 1,
        lastUpdated: new Date()
      }
    });

    const newCalculatedLevel = Math.floor(currentXP.totalXP / XP_PER_LEVEL) + 1;
    
    // If level increased, update it
    if (newCalculatedLevel > currentXP.level) {
      await prisma.xPProgress.update({
        where: { userId },
        data: { level: newCalculatedLevel }
      });
    }

    // 2. Update Daily Streak
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const streakRecord = await prisma.dailyStreak.findUnique({
      where: { userId }
    });

    let newCurrentStreak = 1;
    let newLongestStreak = 1;

    if (streakRecord) {
      const lastActive = new Date(streakRecord.lastActiveDate);
      lastActive.setHours(0, 0, 0, 0);

      if (lastActive.getTime() === yesterday.getTime()) {
         // Continued streak
         newCurrentStreak = streakRecord.currentStreak + 1;
      } else if (lastActive.getTime() < yesterday.getTime()) {
         // Broken streak, reset to 1
         newCurrentStreak = 1;
      } else {
         // Already played today, streak remains the same
         newCurrentStreak = streakRecord.currentStreak;
      }

      newLongestStreak = Math.max(streakRecord.longestStreak, newCurrentStreak);

      await prisma.dailyStreak.update({
        where: { userId },
        data: {
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastActiveDate: new Date()
        }
      });
    } else {
      // Create first streak record
      await prisma.dailyStreak.create({
        data: {
          userId,
          currentStreak: 1,
          longestStreak: 1,
          lastActiveDate: new Date()
        }
      });
    }

    // 3. Update Weekly Leaderboard
    await prisma.leaderboardScore.upsert({
      where: { userId },
      update: {
        weeklyXP: { increment: xpEarned },
        updatedAt: new Date()
      },
      create: {
        userId,
        weeklyXP: xpEarned,
        league: "BRONZE",
        updatedAt: new Date()
      }
    });

    return {
      totalXP: currentXP.totalXP,
      level: newCalculatedLevel,
      levelUp: newCalculatedLevel > currentXP.level,
      currentStreak: newCurrentStreak
    };

  } catch (err) {
    console.error("Gamification Engine Error:", err);
    throw err;
  }
}
