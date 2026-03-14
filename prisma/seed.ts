import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Start seeding ...`)
  
  // 1. Create a dummy Test User
  const user = await prisma.user.upsert({
    where: { email: 'alex@example.com' },
    update: {},
    create: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      image: 'https://github.com/shadcn.png',
      profile: {
        create: {
          nativeLanguage: 'es',
          targetLevel: 'C1',
          currentLevel: 'B1',
          bio: 'Learning English for my tech career.'
        }
      },
      xpProgress: {
        create: {
          totalXP: 3850,
          level: 12
        }
      },
      streaks: {
        create: {
          currentStreak: 14,
          longestStreak: 21
        }
      },
      leaderboardScore: {
        create: {
          weeklyXP: 450,
          league: 'GOLD'
        }
      }
    }
  })
  
  // 2. Create a Sample Lesson
  const lesson = await prisma.lesson.create({
    data: {
      title: 'B2 Business Negotiations',
      description: 'Learn how to present counter-offers politely.',
      level: 'B2',
      moduleType: 'SPEAKING',
      content: { dialog: 'Hello, I would like to propose a new term...' }
    }
  })

  // 3. Create Sample Vocabulary for the Lesson
  await prisma.vocabulary.create({
    data: {
      word: 'Leverage',
      translation: 'Aprovechar / Influencia',
      context: 'We need to leverage our existing resources.',
      level: 'B2',
      lessonId: lesson.id
    }
  })

  console.log(`Seeding finished. Added user: ${user.name} and a sample B2 Lesson.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
