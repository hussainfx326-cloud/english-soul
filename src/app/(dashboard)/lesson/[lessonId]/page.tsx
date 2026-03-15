import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import LessonPlayer from "@/components/features/LessonPlayer";

export default async function LessonPage({ params }: { params: { lessonId: string } }) {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    let lesson = await prisma.lesson.findUnique({
        where: { id: params.lessonId },
        include: { exercises: { orderBy: { order: 'asc' } } }
    });

    if (!lesson) {
        // Fallback for mocked links where lessonId might be "empty" or invalid
        lesson = await prisma.lesson.findFirst({
            include: { exercises: { orderBy: { order: 'asc' } } }
        });
        if (!lesson) redirect("/path");
    }

    return <LessonPlayer lesson={lesson} />;
}
