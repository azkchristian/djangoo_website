"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Truck, Package, CheckCircle, Phone, Camera, QrCode, Navigation } from "lucide-react"
import { QRScanner } from "@/components/qr-scanner"

export default function ChauffeurPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ id: "", password: "" })
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannerTitle, setScannerTitle] = useState("")

  // Données simulées pour l'espace chauffeur
  const trajetsDisponibles = [
    {
      id: 1,
      depart: "Abidjan, Côte d'Ivoire",
      arrivee: "Dakar, Sénégal",
      date: "20/01/2024",
      heure: "08:00",
      nbColis: 5,
      remuneration: "75,000 FCFA",
      distance: "1,200 km",
      statut: "Disponible",
    },
    {
      id: 2,
      depart: "Accra, Ghana",
      arrivee: "Lomé, Togo",
      date: "21/01/2024",
      heure: "10:00",
      nbColis: 3,
      remuneration: "45,000 FCFA",
      distance: "180 km",
      statut: "Disponible",
    },
  ]

  const mesLivraisons = [
    {
      code: "DJG-2849-CI-SN",
      depart: "Point Relais Cocody - Abidjan",
      arrivee: "Point Relais Plateau - Dakar",
      expediteur: "Jean Kouassi",
      destinataire: "Marie Diallo",
      telephone: "+221 77 123 45 67",
      statut: "En cours",
      dateDepart: "18/01/2024",
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginData.id && loginData.password) {
      setIsLoggedIn(true)
    }
  }

  const handleAcceptTrajet = (trajetId: number) => {
    alert(`Trajet ${trajetId} accepté !`)
  }

  const handleQRScan = (result: string) => {
    setShowQRScanner(false)
    alert(`Code scanné: ${result}`)
  }

  const openQRScanner = (title: string) => {
    setScannerTitle(title)
    setShowQRScanner(true)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4FBFD] py-8">
        <div className="container mx-auto px-4 max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#158B9A] rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#0D1B2A]">Espace Chauffeur</CardTitle>
              <p className="text-gray-600">Connectez-vous pour voir vos trajets</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="id">Identifiant chauffeur</Label>
                  <Input
                    id="id"
                    value={loginData.id}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, id: e.target.value }))}
                    placeholder="CH-001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#158B9A] hover:bg-[#158B9A]/90">
                  Se connecter
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0D1B2A] mb-2">Tableau de bord chauffeur</h1>
            <p className="text-gray-600">Bienvenue Jean Kouassi</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => openQRScanner("Scanner un colis")} className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90">
              <QrCode className="mr-2 h-4 w-4" />
              Scanner QR
            </Button>
            <Button onClick={() => setIsLoggedIn(false)} variant="outline">
              Déconnexion
            </Button>
          </div>
        </div>

        <Tabs defaultValue="trajets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="trajets">Trajets disponibles</TabsTrigger>
            <TabsTrigger value="livraisons">Mes livraisons</TabsTrigger>
          </TabsList>

          <TabsContent value="trajets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#0D1B2A]">Trajets disponibles</h2>
              <Badge variant="secondary">{trajetsDisponibles.length} trajets</Badge>
            </div>

            {trajetsDisponibles.map((trajet) => (
              <Card key={trajet.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-[#1CA9C9]" />
                        <span className="font-semibold text-lg">
                          {trajet.depart} → {trajet.arrivee}
                        </span>
                        <Badge className="bg-green-500">{trajet.statut}</Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Date & Heure</p>
                          <p className="font-medium">
                            {trajet.date} à {trajet.heure}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Distance</p>
                          <p className="font-medium">{trajet.distance}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Colis</p>
                          <p className="font-medium">{trajet.nbColis} colis</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Rémunération</p>
                          <p className="font-medium text-[#1CA9C9]">{trajet.remuneration}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAcceptTrajet(trajet.id)}
                        className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accepter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="livraisons" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#0D1B2A]">Mes livraisons en cours</h2>
              <Badge variant="secondary">{mesLivraisons.length} livraison(s)</Badge>
            </div>

            {mesLivraisons.map((livraison) => (
              <Card key={livraison.code}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#1CA9C9]" />
                        <span className="font-semibold">{livraison.code}</span>
                        <Badge className="bg-[#158B9A]">{livraison.statut}</Badge>
                      </div>

                      <div className="space-y-1 text-sm">
                        <p>
                          <strong>De:</strong> {livraison.depart}
                        </p>
                        <p>
                          <strong>Vers:</strong> {livraison.arrivee}
                        </p>
                        <p>
                          <strong>Expéditeur:</strong> {livraison.expediteur}
                        </p>
                        <p>
                          <strong>Destinataire:</strong> {livraison.destinataire}
                        </p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {livraison.telephone}
                        </p>
                        <p>
                          <strong>Départ:</strong> {livraison.dateDepart}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => openQRScanner(`Confirmer livraison - ${livraison.code}`)}
                        variant="outline"
                        className="border-[#1CA9C9] text-[#1CA9C9]"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Scanner
                      </Button>
                      <Button className="bg-green-500 hover:bg-green-600">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Livré
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>

        {showQRScanner && (
          <QRScanner title={scannerTitle} onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />
        )}
      </div>
    </div>
  )
}
