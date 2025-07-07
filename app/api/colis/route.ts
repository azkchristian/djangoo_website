import { type NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.json({ error: "Code de tracking requis" }, { status: 400 })
  }

  const colis = await prisma.colis.findUnique({
    where: { code },
  })

  if (!colis) {
    return NextResponse.json({ error: "Colis non trouvé" }, { status: 404 })
  }

  return NextResponse.json(colis)
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log("Reçu :", data)
    // Génération d'un code de tracking unique
    const code = `DJG-${Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0")}-${data.villeDepart.split(",")[1]?.trim().substring(0, 2).toUpperCase() || "XX"}-${
      data.villeArrivee.split(",")[1]?.trim().substring(0, 2).toUpperCase() || "XX"
    }`

    const nouveauColis = await prisma.colis.create({
      data: {
        code,
        expediteur: data.expediteurNom,
        destinataire: data.destinataireNom,
        villeDepart: data.villeDepart,
        villeArrivee: data.villeArrivee,
        telephoneDest: data.telephoneDest, // 👈 AJOUT ICI
        statut: "Enregistré",
        steps: data.steps || [],
      },
    })

    return NextResponse.json({
      success: true,
      trackingCode: code,
      message: "Colis enregistré avec succès",
    })
  } catch (error) {
    console.error("Erreur lors de la création du colis:", error)
    return NextResponse.json(
      {
        error: "Erreur lors de l'enregistrement du colis",
      },
      { status: 500 },
    )
  }
}
