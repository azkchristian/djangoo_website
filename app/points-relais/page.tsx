"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Phone, Navigation, Loader2 } from "lucide-react"

interface PointRelais {
  id: number
  nom: string
  adresse: string
  ville: string
  pays: string
  telephone: string
  horaires: {
    lundi: string
    mardi: string
    mercredi: string
    jeudi: string
    vendredi: string
    samedi: string
    dimanche: string
  }
  latitude: number
  longitude: number
  distance?: number
}

export default function PointsRelaisPage() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [pointsRelais, setPointsRelais] = useState<PointRelais[]>([])
  const [loading, setLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)

  // Données simulées des points relais
  const mockPointsRelais: PointRelais[] = [
    {
      id: 1,
      nom: "Point Relais Cocody",
      adresse: "Rue des Jardins, Cocody",
      ville: "Abidjan",
      pays: "Côte d'Ivoire",
      telephone: "+225 27 22 44 55 66",
      horaires: {
        lundi: "08:00 - 18:00",
        mardi: "08:00 - 18:00",
        mercredi: "08:00 - 18:00",
        jeudi: "08:00 - 18:00",
        vendredi: "08:00 - 18:00",
        samedi: "09:00 - 17:00",
        dimanche: "Fermé",
      },
      latitude: 5.3364,
      longitude: -4.0267,
    },
    {
      id: 2,
      nom: "Point Relais Plateau",
      adresse: "Avenue Chardy, Plateau",
      ville: "Abidjan",
      pays: "Côte d'Ivoire",
      telephone: "+225 27 20 30 40 50",
      horaires: {
        lundi: "07:30 - 19:00",
        mardi: "07:30 - 19:00",
        mercredi: "07:30 - 19:00",
        jeudi: "07:30 - 19:00",
        vendredi: "07:30 - 19:00",
        samedi: "08:00 - 18:00",
        dimanche: "10:00 - 16:00",
      },
      latitude: 5.3197,
      longitude: -4.0267,
    },
    {
      id: 3,
      nom: "Point Relais Yopougon",
      adresse: "Marché de Yopougon",
      ville: "Abidjan",
      pays: "Côte d'Ivoire",
      telephone: "+225 27 23 45 67 89",
      horaires: {
        lundi: "08:00 - 17:00",
        mardi: "08:00 - 17:00",
        mercredi: "08:00 - 17:00",
        jeudi: "08:00 - 17:00",
        vendredi: "08:00 - 17:00",
        samedi: "08:00 - 16:00",
        dimanche: "Fermé",
      },
      latitude: 5.3456,
      longitude: -4.0789,
    },
    {
      id: 4,
      nom: "Point Relais Plateau Dakar",
      adresse: "Avenue Léopold Sédar Senghor",
      ville: "Dakar",
      pays: "Sénégal",
      telephone: "+221 33 821 23 45",
      horaires: {
        lundi: "08:00 - 18:30",
        mardi: "08:00 - 18:30",
        mercredi: "08:00 - 18:30",
        jeudi: "08:00 - 18:30",
        vendredi: "08:00 - 18:30",
        samedi: "09:00 - 17:00",
        dimanche: "Fermé",
      },
      latitude: 14.6937,
      longitude: -17.4441,
    },
  ]

  // Fonction pour calculer la distance entre deux points (formule de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371 // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  // Demander l'accès à la géolocalisation
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })

          // Calculer les distances et trier par proximité
          const pointsAvecDistance = mockPointsRelais
            .map((point) => ({
              ...point,
              distance: calculateDistance(latitude, longitude, point.latitude, point.longitude),
            }))
            .sort((a, b) => a.distance! - b.distance!)

          setPointsRelais(pointsAvecDistance)
          setLoading(false)
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error)
          setLocationError("Impossible d'accéder à votre localisation")
          // Afficher tous les points sans tri par distance
          setPointsRelais(mockPointsRelais)
          setLoading(false)
        },
      )
    } else {
      setLocationError("Géolocalisation non supportée")
      setPointsRelais(mockPointsRelais)
      setLoading(false)
    }
  }, [])

  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`
    }
    return `${distance.toFixed(1)}km`
  }

  const isOpenNow = (horaires: PointRelais["horaires"]): boolean => {
    const now = new Date()
    const dayNames = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
    const today = dayNames[now.getDay()] as keyof typeof horaires
    const todayHours = horaires[today]

    if (todayHours === "Fermé") return false

    const [openTime, closeTime] = todayHours.split(" - ")
    const [openHour, openMin] = openTime.split(":").map(Number)
    const [closeHour, closeMin] = closeTime.split(":").map(Number)

    const currentTime = now.getHours() * 60 + now.getMinutes()
    const openMinutes = openHour * 60 + openMin
    const closeMinutes = closeHour * 60 + closeMin

    return currentTime >= openMinutes && currentTime <= closeMinutes
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#1CA9C9]" />
            <h1 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-2">
              Localisation des points relais...
            </h1>
            <p className="text-gray-600 dark:text-neutral-300">Nous recherchons les points relais près de vous</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">Points relais Djongoo</h1>
          <p className="text-gray-600 dark:text-neutral-300">
            {userLocation ? "Points relais triés par proximité" : "Tous nos points relais disponibles"}
          </p>
          {locationError && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-sm">{locationError}</p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pointsRelais.map((point) => (
            <Card
              key={point.id}
              className="hover:shadow-lg transition-shadow dark:bg-neutral-800 dark:border-neutral-700"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg text-[#0D1B2A] dark:text-neutral-100">{point.nom}</CardTitle>
                  <Badge className={isOpenNow(point.horaires) ? "bg-green-500" : "bg-red-500"}>
                    {isOpenNow(point.horaires) ? "Ouvert" : "Fermé"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-[#1CA9C9] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">{point.adresse}</p>
                    <p className="text-sm text-gray-600">
                      {point.ville}, {point.pays}
                    </p>
                    {point.distance && (
                      <p className="text-sm text-[#1CA9C9] font-medium">
                        <Navigation className="h-3 w-3 inline mr-1" />
                        {formatDistance(point.distance)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[#1CA9C9]" />
                  <p className="text-sm">{point.telephone}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#1CA9C9]" />
                    <p className="text-sm font-medium">Horaires</p>
                  </div>
                  <div className="text-xs space-y-1 ml-6">
                    {Object.entries(point.horaires).map(([jour, horaire]) => (
                      <div key={jour} className="flex justify-between">
                        <span className="capitalize font-medium">{jour}:</span>
                        <span className={horaire === "Fermé" ? "text-red-600" : "text-gray-600"}>{horaire}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
                    onClick={() => {
                      if (userLocation) {
                        const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${point.latitude},${point.longitude}`
                        window.open(url, "_blank")
                      } else {
                        const url = `https://www.google.com/maps/search/${encodeURIComponent(
                          point.adresse + ", " + point.ville,
                        )}`
                        window.open(url, "_blank")
                      }
                    }}
                  >
                    <Navigation className="mr-2 h-4 w-4" />
                    Itinéraire
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {pointsRelais.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">Aucun point relais trouvé dans votre région.</p>
          </div>
        )}
      </div>
    </div>
  )
}
