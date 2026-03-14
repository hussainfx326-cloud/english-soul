import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { processGamificationEngine } from '@/lib/gamification';

// GET /api/progress?userId=xyz
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }

  try {
    const progress = await prisma.learningProgress.findMany({
      where: { userId },
      include: {
        lesson: true
      }
    });

    const xp = await prisma.xPProgress.findUnique({
      where: { userId }
    });

    return NextResponse.json({ progress, xp });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/progress (Complete a lesson)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, lessonId, score } = body;

    if (!userId || !lessonId) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update Progress
    const progress = await prisma.learningProgress.upsert({
      where: {
        userId_lessonId: {
          userId,
          lessonId
        }
      },
      update: {
        status: 'COMPLETED',
        score,
        completedAt: new Date(),
        lastAccessedAt: new Date()
      },
      create: {
        userId,
        lessonId,
        status: 'COMPLETED',
        score,
        completedAt: new Date(),
        lastAccessedAt: new Date()
      }
    });

    // Run Gamification Engine (XP, Streaks, Leaderboard)
    const xpReward = 50; // Base score for a lesson
    const gamificationResult = await processGamificationEngine(userId, xpReward);

    return NextResponse.json({ 
      progress, 
      gamification: gamificationResult 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
