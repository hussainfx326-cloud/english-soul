"use server";

import { signIn } from "@/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";

export async function loginWithCreds(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", formData);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function loginWithGoogle() {
  await signIn("google");
}

export async function signUpUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "Please fill out all fields." };
  }

  try {
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { error: "User already exists with this email." };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {
             nativeLanguage: 'es',
             targetLevel: 'C1',
             currentLevel: 'B1'
          }
        },
        xpProgress: {
          create: { totalXP: 0, level: 1 }
        },
        streaks: {
          create: { currentStreak: 0, longestStreak: 0 }
        },
        leaderboardScore: {
          create: { weeklyXP: 0, league: 'BRONZE' }
        }
      }
    });

    // Automatically sign in the user after creating
    await signIn("credentials", formData);
    return { success: true };
    
  } catch (error) {
     if (error instanceof AuthError) {
       return { error: "Could not sign in automatically." };
     }
     
     console.error("Signup error:", error);
     return { error: "Something went wrong creating the account." };
  }
}
