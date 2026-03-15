"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(prevState: any, formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user?.id) return { error: "Unauthorized" };

    const name = formData.get("name") as string;
    const nativeLanguage = formData.get("nativeLanguage") as string;
    const learningGoal = formData.get("learningGoal") as string;
    const dailyGoal = parseInt(formData.get("dailyGoal") as string);

    if (name) {
      await prisma.user.update({
        where: { id: session.user.id },
        data: { name }
      });
    }

    await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        nativeLanguage,
        learningGoal,
        dailyGoal,
        currentLevel: 'B1'
      },
      update: {
        nativeLanguage,
        learningGoal,
        dailyGoal
      }
    });

    revalidatePath("/profile");
    revalidatePath("/home");
    return { success: true };
  } catch (error) {
    console.error("Profile update error:", error);
    return { error: "Failed to update profile." };
  }
}
