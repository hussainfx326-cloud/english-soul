import { PrismaClient, Level, ExerciseType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log(`Starting English Soul V2 curriculum seed...`)
  
  // Clean existing curriculum data (optional, but good for reliable seeding)
  await prisma.exercise.deleteMany({})
  await prisma.lesson.deleteMany({})
  await prisma.unit.deleteMany({})
  await prisma.course.deleteMany({})

  // 1. Create B1 Course (Intermediate)
  const courseB1 = await prisma.course.create({
    data: {
      title: 'Intermediate English (B1)',
      description: 'Master daily conversations, travel situations, and express opinions clearly.',
      level: Level.B1,
    }
  })

  // 2. Create B2 Course (Upper Intermediate)
  const courseB2 = await prisma.course.create({
    data: {
      title: 'Upper Intermediate (B2)',
      description: 'Communicate with native speakers fluently and understand complex texts.',
      level: Level.B2,
    }
  })

  // 3. Create Units for B2
  const unit1_B2 = await prisma.unit.create({
    data: {
      title: 'Professional Communication',
      description: 'Emails, presentations, and formal negotiations.',
      order: 1,
      courseId: courseB2.id
    }
  })

  const unit2_B2 = await prisma.unit.create({
    data: {
      title: 'Debates & Opinions',
      description: 'Expressing precise arguments and agreeing/disagreeing.',
      order: 2,
      courseId: courseB2.id
    }
  })

  // 4. Create Lessons for Unit 1 B2
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'The Art of Formal Emails',
      description: 'Learn the structure and vocabulary of professional correspondence.',
      order: 1,
      unitId: unit1_B2.id
    }
  })

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Leading a Meeting',
      description: 'Phrasal verbs and structures for taking charge of a discussion.',
      order: 2,
      unitId: unit1_B2.id
    }
  })

  // 5. Create Interactive Exercises for Lesson 1
  
  // Reading Exercise
  await prisma.exercise.create({
    data: {
      title: 'Analyze the Email',
      type: ExerciseType.READING,
      order: 1,
      lessonId: lesson1.id,
      content: {
        text: "Dear Mr. Smith,\n\nI am writing to inquire about the status of our recent order (Ref: #8922). We were expecting delivery by Tuesday, but have not yet received any confirmation.\n\nCould you please look into this matter urgently and provide an updated ETA?\n\nBest regards,\nSarah Connor",
        questions: [
          { question: "What is the main purpose of this email?", options: ["To complain about quality", "To ask about a delivery status", "To cancel an order"], correctIndex: 1 }
        ]
      }
    }
  })

  // Vocabulary Fill in the blank
  await prisma.exercise.create({
    data: {
      title: 'Fill in the blanks',
      type: ExerciseType.GRAMMAR,
      order: 2,
      lessonId: lesson1.id,
      content: {
        text: "Could you please [input] into this matter urgently and provide an updated [input]?",
        blanks: ["look", "ETA"]
      }
    }
  })

  // Multiple Choice Quiz
  await prisma.exercise.create({
    data: {
      title: 'Formal vs Informal',
      type: ExerciseType.QUIZ,
      order: 3,
      lessonId: lesson1.id,
      content: {
        questions: [
          {
            prompt: "Which phrase is most appropriate for opening a formal business email?",
            options: ["Hey there,", "Dear [Name],", "What's up,"],
            correctAnswer: 1,
            explanation: "'Dear [Name],' is the standard formal opening."
          },
          {
            prompt: "How should you formally say 'tell me'?",
            options: ["Let me know", "Spit it out", "Inform me"],
            correctAnswer: 2,
            explanation: "'Inform me' or 'Please let me know' are formal."
          }
        ]
      }
    }
  })
  
  // Interactive Speaking prompt
  await prisma.exercise.create({
    data: {
      title: 'Leave a Voicemail',
      type: ExerciseType.SPEAKING,
      order: 4,
      lessonId: lesson1.id,
      content: {
        prompt: "You need to call Mr. Smith because he didn't reply to the email. Leave a polite voicemail mentioning the order number #8922.",
        targetKeywords: ["calling", "order", "status", "return", "call"]
      }
    }
  })

  console.log(`Seeding finished. Added B1 and B2 base curriculum.`)
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
