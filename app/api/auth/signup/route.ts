import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    // Validation des champs requis
    if (!data.nom || !data.prenom || !data.email || !data.password || !data.role) {
      return NextResponse.json(
        { error: "Tous les champs requis doivent être fournis" },
        { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })
    if (existingUser) {
      return NextResponse.json(
        { error: "Cet email est déjà utilisé" },
        { status: 409 }
      )
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        nom: data.nom,
        prenom: data.prenom,
        email: data.email,
        telephone: data.telephone || null,
        password: hashedPassword,
        role: data.role,
        ville: data.ville || null,
        adresse: data.adresse || null,
        vehicule: data.vehicule || null,
        experience: data.experience || null,
        motivation: data.motivation || null,
      },
    })

    // Retourner une réponse réussie
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
    console.error("Erreur lors de l'inscription :", error)
    return NextResponse.json(
      { error: "Erreur serveur. Veuillez réessayer plus tard." },
      { status: 500 }
    )
  }
}
