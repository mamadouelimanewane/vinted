'use server';

import { signIn, signOut } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"

export async function handleGoogleSignIn() {
    await signIn("google", { redirectTo: "/" })
}

export async function handleSignOut() {
    await signOut({ redirectTo: "/" })
}

export async function handleCredentialsSignIn(formData: FormData) {
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: "/"
        })
    } catch (error) {
        throw error
    }
}

export async function handleSignUp(formData: FormData) {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!name || !email || !password) {
        throw new Error("Tous les champs sont requis")
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    })

    if (existingUser) {
        throw new Error("Cet email est déjà utilisé")
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    })

    // Sign in the user
    await signIn("credentials", {
        email,
        password,
        redirectTo: "/"
    })
}
