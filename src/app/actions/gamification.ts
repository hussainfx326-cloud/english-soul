"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function addXpToUser(amount: number) {
    const session = await auth();
    if (!session?.user?.id) return { success: false, error: "Unauthorized" };

    try {
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { xpProgress: true }
        });

        if (!user) return { success: false, error: "User not found" };

        let xpProgress = user.xpProgress;

        if (!xpProgress) {
            // Create XP record if missing
            xpProgress = await prisma.xPProgress.create({
                data: {
                    userId: session.user.id,
                    totalXP: amount,
                    level: 1
                }
            });
        } else {
            // Update existing XP
            const newTotal = xpProgress.totalXP + amount;
            xpProgress = await prisma.xPProgress.update({
                where: { id: xpProgress.id },
                data: { 
                    totalXP: newTotal,
                    level: Math.floor(newTotal / 100) || 1
                }
            });
        }

        return { success: true, newTotal: xpProgress.totalXP, newLevel: xpProgress.level };
        
    } catch (error) {
        console.error("Failed to add XP", error);
        return { success: false, error: "Database error" };
    }
}
