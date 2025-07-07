"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Truck, MapPin, Clock, DollarSign, Users, CheckCircle } from "lucide-react"

export default function DevenirLivreurPage() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    ville: "",
    experience: "",
    vehicule: "",
    disponibilite: "",
    motivation: "",
  })
  const [submitted, setSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">
                Candidature envoyée avec succès !
              </h2>
              <p className="text-gray-600 dark:text-neutral-300 mb-6">
                Merci pour votre intérêt à rejoindre l'équipe Djongoo. Nous examinerons votre candidature et vous
                contacterons dans les plus brefs délais.
              </p>
              <div className="bg-[#1CA9C9]/10 border border-[#1CA9C9] rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-600 dark:text-neutral-300 mb-2">Prochaines étapes</p>
                <ul className="text-sm text-left space-y-1">
                  <li>• Vérification de votre dossier (24-48h)</li>
                  <li>• Entretien téléphonique</li>
                  <li>• Formation et intégration</li>
                </ul>
              </div>
              <Button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({
                    nom: "",
                    prenom: "",
                    telephone: "",
                    email: "",
                    ville: "",
                    experience: "",
                    vehicule: "",
                    disponibilite: "",
                    motivation: "",
                  })
                }}
                className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
              >
                Retour à l'accueil
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">
            Devenez livreur Djongoo
          </h1>
          <p className="text-lg text-gray-600 dark:text-neutral-300 max-w-2xl mx-auto">
            Rejoignez notre réseau de livreurs partenaires et participez à la révolution de la livraison en Afrique de
            l'Ouest
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Avantages */}
          <div>
            <h2 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-6">
              Pourquoi devenir livreur Djongoo ?
            </h2>
            <div className="space-y-4">
              <Card className="dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1CA9C9] rounded-full flex items-center justify-center flex-shrink-0">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Revenus attractifs</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      Gagnez jusqu'à 200 000 FCFA par mois avec des trajets réguliers et des bonus de performance
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#158B9A] rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Flexibilité</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      Choisissez vos horaires et vos trajets selon votre disponibilité
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#1CA9C9] rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Communauté</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      Rejoignez une communauté de livreurs professionnels avec support 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#158B9A] rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Couverture étendue</h3>
                    <p className="text-gray-600 dark:text-neutral-300 text-sm">
                      Travaillez sur des trajets inter-pays à travers l'Afrique de l'Ouest
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Formulaire de candidature */}
          <div>
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#1CA9C9]" />
                  Postuler maintenant
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="prenom">Prénom *</Label>
                      <Input
                        id="prenom"
                        value={formData.prenom}
                        onChange={(e) => handleInputChange("prenom", e.target.value)}
                        placeholder="Jean"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nom">Nom *</Label>
                      <Input
                        id="nom"
                        value={formData.nom}
                        onChange={(e) => handleInputChange("nom", e.target.value)}
                        placeholder="Kouassi"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="telephone">Téléphone *</Label>
                      <Input
                        id="telephone"
                        value={formData.telephone}
                        onChange={(e) => handleInputChange("telephone", e.target.value)}
                        placeholder="+225 XX XX XX XX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="jean@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="ville">Ville de résidence *</Label>
                    <Select value={formData.ville} onValueChange={(value) => handleInputChange("ville", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre ville" />
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
                    <Label htmlFor="vehicule">Type de véhicule *</Label>
                    <Select value={formData.vehicule} onValueChange={(value) => handleInputChange("vehicule", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre véhicule" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moto">Moto</SelectItem>
                        <SelectItem value="voiture">Voiture</SelectItem>
                        <SelectItem value="camionnette">Camionnette</SelectItem>
                        <SelectItem value="camion">Camion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="experience">Expérience de conduite *</Label>
                    <Select
                      value={formData.experience}
                      onValueChange={(value) => handleInputChange("experience", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Années d'expérience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-2">1-2 ans</SelectItem>
                        <SelectItem value="3-5">3-5 ans</SelectItem>
                        <SelectItem value="5-10">5-10 ans</SelectItem>
                        <SelectItem value="10+">Plus de 10 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="disponibilite">Disponibilité *</Label>
                    <Select
                      value={formData.disponibilite}
                      onValueChange={(value) => handleInputChange("disponibilite", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Votre disponibilité" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="temps-plein">Temps plein</SelectItem>
                        <SelectItem value="temps-partiel">Temps partiel</SelectItem>
                        <SelectItem value="weekend">Week-ends uniquement</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="motivation">Pourquoi voulez-vous rejoindre Djongoo ? *</Label>
                    <Textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value)}
                      placeholder="Parlez-nous de votre motivation..."
                      rows={3}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 text-lg py-3">
                    <Truck className="mr-2 h-5 w-5" />
                    Envoyer ma candidature
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Processus de recrutement */}
        <Card className="dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader>
            <CardTitle className="text-center text-[#0D1B2A] dark:text-neutral-100">Processus de recrutement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-[#1CA9C9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Candidature</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300">Remplissez le formulaire en ligne</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#158B9A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Vérification</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300">Vérification des documents et références</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#1CA9C9] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Entretien</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300">Entretien téléphonique avec notre équipe</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#158B9A] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">4</span>
                </div>
                <h3 className="font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-2">Formation</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-300">Formation et intégration dans l'équipe</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
