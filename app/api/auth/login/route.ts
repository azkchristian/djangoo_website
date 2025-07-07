import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const { email, password, userType } = await req.json()

    // Validation des champs requis
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être fournis" },
        { status: 400 }
      )
    }

    // Rechercher l'utilisateur dans la base de données
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        role: userType, // Vérifie également le rôle
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable" },
        { status: 404 }
      )
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      )
    }

    // Retourner une réponse réussie avec les informations essentielles de l'utilisateur
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la connexion :", error)
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}
