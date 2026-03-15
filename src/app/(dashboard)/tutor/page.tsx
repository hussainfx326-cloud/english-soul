import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import AITutorChat from "@/components/features/AITutor";

export default async function TutorPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    // Get or create a conversation for this user
    let conversation = await prisma.tutorConversation.findFirst({
        where: { userId: session.user.id },
        include: { messages: { orderBy: { createdAt: 'asc' } } }
    });

    if (!conversation) {
        await prisma.tutorConversation.create({
            data: {
                userId: session.user.id,
                messages: {
                    create: {
                        role: "assistant",
                        content: "Hello! I am your AI native tutor. Are there any grammar rules or sentences you want me to check today?",
                    }
                }
            }
        });
        
        conversation = await prisma.tutorConversation.findFirst({
            where: { userId: session.user.id },
            include: { messages: { orderBy: { createdAt: 'asc' } } }
        });
    }
    
    if (!conversation) return null;

    const userProfile = await prisma.userProfile.findUnique({
        where: { userId: session.user.id }
    });

    return (
        <div className="h-[80vh] w-full max-w-4xl mx-auto py-6">
            <AITutorChat 
                initialMessages={conversation.messages} 
                conversationId={conversation.id}
                userLevel={userProfile?.currentLevel || 'B1'} 
            />
        </div>
    );
}
