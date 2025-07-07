"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, User, MapPin, Weight } from "lucide-react"

export default function EnvoyerPage() {
  const [formData, setFormData] = useState({
    expediteurNom: "",
    expediteurTel: "",
    villeDepart: "",
    pointRelaisDepart: "",
    destinataireNom: "",
    destinataireTel: "",
    villeArrivee: "",
    poids: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [trackingCode, setTrackingCode] = useState("")

  const villes = [
    "Abidjan, Côte d'Ivoire",
    "Accra, Ghana",
    "Bamako, Mali",
    "Dakar, Sénégal",
    "Lomé, Togo",
    "Ouagadougou, Burkina Faso",
    "Conakry, Guinée",
    "Niamey, Niger",
  ]

  const pointsRelais = {
    "Abidjan, Côte d'Ivoire": ["Point Relais Cocody", "Point Relais Plateau", "Point Relais Yopougon"],
    "Dakar, Sénégal": ["Point Relais Plateau", "Point Relais Almadies", "Point Relais Parcelles"],
    "Accra, Ghana": ["Point Relais Osu", "Point Relais Tema", "Point Relais Kumasi"],
    "Lomé, Togo": ["Point Relais Centre", "Point Relais Bè", "Point Relais Kégué"],
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Génération d'un code de tracking unique
    const code = `DJG-${Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0")}-${formData.villeDepart.split(",")[1]?.trim().substring(0, 2).toUpperCase() || "XX"}-${
      formData.villeArrivee.split(",")[1]?.trim().substring(0, 2).toUpperCase() || "XX"
    }`

    setTrackingCode(code)
    setSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="text-center dark:bg-neutral-800 dark:border-neutral-700">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">
                Colis enregistré avec succès !
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 mb-6">
                Votre colis a été enregistré dans notre système. Voici votre code de suivi :
              </p>
              <div className="bg-[#1CA9C9]/10 border border-[#1CA9C9] rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">Code de suivi</p>
                <p className="text-2xl font-bold text-[#1CA9C9]">{trackingCode}</p>
              </div>
              <p className="text-sm text-gray-600 mb-6">
                Conservez précieusement ce code pour suivre votre colis. Vous pouvez maintenant déposer votre colis au
                point relais sélectionné.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => {
                    setSubmitted(false)
                    setFormData({
                      expediteurNom: "",
                      expediteurTel: "",
                      villeDepart: "",
                      pointRelaisDepart: "",
                      destinataireNom: "",
                      destinataireTel: "",
                      villeArrivee: "",
                      poids: "",
                    })
                  }}
                  variant="outline"
                  className="border-[#1CA9C9] text-[#1CA9C9]"
                >
                  Envoyer un autre colis
                </Button>
                <Button
                  onClick={() => (window.location.href = `/suivi?code=${trackingCode}`)}
                  className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
                >
                  Suivre ce colis
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">Envoyer un colis</h1>
          <p className="text-gray-600 dark:text-neutral-300">
            Remplissez le formulaire ci-dessous pour enregistrer votre envoi
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations Expéditeur */}
          <Card className="dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                <User className="h-5 w-5 text-[#1CA9C9]" />
                Informations de l'expéditeur
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expediteurNom">Nom complet *</Label>
                  <Input
                    id="expediteurNom"
                    value={formData.expediteurNom}
                    onChange={(e) => handleInputChange("expediteurNom", e.target.value)}
                    placeholder="Jean Kouassi"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="expediteurTel">Téléphone *</Label>
                  <Input
                    id="expediteurTel"
                    value={formData.expediteurTel}
                    onChange={(e) => handleInputChange("expediteurTel", e.target.value)}
                    placeholder="+225 XX XX XX XX"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Point de départ */}
          <Card className="dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                <MapPin className="h-5 w-5 text-[#1CA9C9]" />
                Point de départ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="villeDepart">Ville de départ *</Label>
                  <Select
                    value={formData.villeDepart}
                    onValueChange={(value) => handleInputChange("villeDepart", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une ville" />
                    </SelectTrigger>
                    <SelectContent>
                      {villes.map((ville) => (
                        <SelectItem key={ville} value={ville}>
                          {ville}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="pointRelaisDepart">Point relais de dépôt *</Label>
                  <Select
                    value={formData.pointRelaisDepart}
                    onValueChange={(value) => handleInputChange("pointRelaisDepart", value)}
                    disabled={!formData.villeDepart}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un point relais" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.villeDepart &&
                        pointsRelais[formData.villeDepart as keyof typeof pointsRelais]?.map((point) => (
                          <SelectItem key={point} value={point}>
                            {point}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informations Destinataire */}
          <Card className="dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                <User className="h-5 w-5 text-[#1CA9C9]" />
                Informations du destinataire
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="destinataireNom">Nom complet *</Label>
                  <Input
                    id="destinataireNom"
                    value={formData.destinataireNom}
                    onChange={(e) => handleInputChange("destinataireNom", e.target.value)}
                    placeholder="Marie Diallo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="destinataireTel">Téléphone *</Label>
                  <Input
                    id="destinataireTel"
                    value={formData.destinataireTel}
                    onChange={(e) => handleInputChange("destinataireTel", e.target.value)}
                    placeholder="+221 XX XXX XX XX"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="villeArrivee">Ville d'arrivée *</Label>
                <Select
                  value={formData.villeArrivee}
                  onValueChange={(value) => handleInputChange("villeArrivee", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez une ville" />
                  </SelectTrigger>
                  <SelectContent>
                    {villes
                      .filter((ville) => ville !== formData.villeDepart)
                      .map((ville) => (
                        <SelectItem key={ville} value={ville}>
                          {ville}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Informations du colis */}
          <Card className="dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                <Weight className="h-5 w-5 text-[#1CA9C9]" />
                Informations du colis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="poids">Poids approximatif (kg) *</Label>
                <Select value={formData.poids} onValueChange={(value) => handleInputChange("poids", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le poids" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">0 - 1 kg</SelectItem>
                    <SelectItem value="1-5">1 - 5 kg</SelectItem>
                    <SelectItem value="5-10">5 - 10 kg</SelectItem>
                    <SelectItem value="10-20">10 - 20 kg</SelectItem>
                    <SelectItem value="20+">Plus de 20 kg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <Button type="submit" size="lg" className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 px-12 py-4 text-lg">
              <Package className="mr-2 h-5 w-5" />
              Enregistrer le colis
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
