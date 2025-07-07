"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, MapPin, Clock, CheckCircle } from "lucide-react"

export default function SuiviPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTrack = async () => {
    if (!trackingCode.trim()) return

    setLoading(true)
    setError(null)

    try {
      // Appel à l'API pour récupérer les données de suivi
      const response = await fetch(`/api/colis?code=${trackingCode}`)
      if (!response.ok) {
        throw new Error("Colis introuvable ou erreur serveur.")
      }

      const data = await response.json()
      setTrackingData(data)
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue.")
      setTrackingData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">Suivre votre colis</h1>
          <p className="text-gray-600 dark:text-neutral-300">
            Entrez votre code de tracking pour connaître l'état de votre colis
          </p>
        </div>

        {/* Formulaire de recherche */}
        <Card className="mb-8 dark:bg-neutral-800 dark:border-neutral-700">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Ex: DJG-2849-TG-CI"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="text-lg h-12"
                />
              </div>
              <Button onClick={handleTrack} disabled={loading} className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 h-12 px-8">
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                ) : (
                  <Search className="mr-2 h-5 w-5" />
                )}
                Rechercher
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Affichage des résultats */}
        {error && (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        )}

        {trackingData && (
          <div className="space-y-6">
            {/* Informations du colis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                  <Package className="h-5 w-5 text-[#1CA9C9]" />
                  Informations du colis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300">Code de suivi</p>
                    <p className="font-semibold">{trackingData.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-300">Statut actuel</p>
                    <Badge className="bg-[#158B9A] text-white">{trackingData.statut}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expéditeur</p>
                    <p className="font-semibold">{trackingData.expediteur}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Destinataire</p>
                    <p className="font-semibold">{trackingData.destinataire}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ville de départ</p>
                    <p className="font-semibold">{trackingData.villeDepart}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Ville d'arrivée</p>
                    <p className="font-semibold">{trackingData.villeArrivee}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Étapes de suivi */}
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                  <MapPin className="h-5 w-5 text-[#1CA9C9]" />
                  Suivi détaillé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.steps.map((step: any, index: number) => (
                    <div key={index} className="flex items-start gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          step.completed ? "bg-[#1CA9C9] text-white" : "bg-gray-200 text-gray-400"
                        }`}
                      >
                        {step.completed ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <div>
                            <p className={`font-semibold ${step.completed ? "text-[#0D1B2A]" : "text-gray-400"}`}>
                              {step.status}
                            </p>
                            <p className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                              {step.location}
                            </p>
                          </div>
                          <div className={`text-sm ${step.completed ? "text-gray-600" : "text-gray-400"}`}>
                            {step.date} • {step.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
