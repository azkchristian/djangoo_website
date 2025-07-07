"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Package, CheckCircle, Clock, MapPin, Phone, Camera, QrCode } from "lucide-react"
import { QRScanner } from "@/components/qr-scanner"

export default function PointRelaisPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ id: "", password: "" })
  const [showQRScanner, setShowQRScanner] = useState(false)
  const [scannerTitle, setScannerTitle] = useState("")

  const [searchCode, setSearchCode] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [searchLoading, setSearchLoading] = useState(false)

  // Données simulées pour l'espace point relais
  const colisARecevoir = [
    {
      code: "DJG-1234-CI-SN",
      expediteur: "Jean Kouassi",
      destinataire: "Marie Diallo",
      telephone: "+221 77 123 45 67",
      dateArrivee: "17/01/2024",
      statut: "En transit",
    },
    {
      code: "DJG-5678-GH-TG",
      expediteur: "Kwame Asante",
      destinataire: "Fatou Mensah",
      telephone: "+228 90 123 45 67",
      dateArrivee: "18/01/2024",
      statut: "Arrivé",
    },
  ]

  const colisARetirer = [
    {
      code: "DJG-9876-BF-CI",
      expediteur: "Aminata Traoré",
      destinataire: "Koffi Yao",
      telephone: "+225 07 123 45 67",
      dateArrivee: "15/01/2024",
      statut: "Disponible",
      joursAttente: 2,
    },
  ]

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulation de connexion
    if (loginData.id && loginData.password) {
      setIsLoggedIn(true)
    }
  }

  const handleMarkAsReceived = (code: string) => {
    alert(`Colis ${code} marqué comme reçu`)
  }

  const handleMarkAsPickedUp = (code: string) => {
    alert(`Colis ${code} marqué comme retiré`)
  }

  const handleQRScan = (result: string) => {
    setShowQRScanner(false)
    alert(`Code scanné: ${result}`)
    // Ici vous pouvez traiter le code scanné
  }

  const openQRScanner = (title: string) => {
    setScannerTitle(title)
    setShowQRScanner(true)
  }

  const handleSearchByCode = async () => {
    if (!searchCode.trim()) return

    setSearchLoading(true)

    // Simulation de recherche en base de données
    setTimeout(() => {
      // Données simulées - remplacer par un vrai appel API
      const mockResult = {
        code: searchCode,
        destinataire: "Marie Diallo",
        expediteur: "Jean Kouassi",
        telephone: "+221 77 123 45 67",
        dateArrivee: "15/01/2024",
        statut: "Disponible",
        pointRelais: "Point Relais Plateau - Dakar",
        villeDepart: "Abidjan, Côte d'Ivoire",
        poids: "2.5 kg",
      }

      if (searchCode === "DJG-9876-BF-CI" || searchCode.startsWith("DJG-")) {
        setSearchResult(mockResult)
      } else {
        setSearchResult(null)
        alert("Aucun colis trouvé avec ce code")
      }
      setSearchLoading(false)
    }, 1000)
  }

  const handleConfirmPickup = (code: string) => {
    alert(`Colis ${code} remis au destinataire`)
    setSearchResult(null)
    setSearchCode("")
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="dark:bg-neutral-800 dark:border-neutral-700">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-[#158B9A] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#0D1B2A] dark:text-neutral-100">Espace Point Relais</CardTitle>
              <p className="text-gray-600 dark:text-neutral-300">Connectez-vous pour gérer vos colis</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="id">Identifiant du point relais</Label>
                  <Input
                    id="id"
                    value={loginData.id}
                    onChange={(e) => setLoginData((prev) => ({ ...prev, id: e.target.value }))}
                    placeholder="PR-PLATEAU-001"
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

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 font-semibold mb-2">Vous n'êtes pas encore partenaire ?</p>
                <p className="text-sm text-blue-700 mb-3">
                  Rejoignez notre réseau de points relais et développez votre activité !
                </p>
                <Button variant="outline" className="w-full border-blue-300 text-blue-700 bg-transparent">
                  Devenir partenaire
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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-2">
              Point Relais Plateau - Dakar
            </h1>
            <p className="text-gray-600 dark:text-neutral-300 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Avenue Léopold Sédar Senghor, Dakar
            </p>
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

        <Tabs defaultValue="recevoir" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recevoir">Colis à recevoir</TabsTrigger>
            <TabsTrigger value="retirer">Colis à retirer</TabsTrigger>
            <TabsTrigger value="recherche">Recherche client</TabsTrigger>
          </TabsList>

          <TabsContent value="recevoir" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100">
                Colis en attente de réception
              </h2>
              <Badge variant="secondary">{colisARecevoir.length} colis</Badge>
            </div>

            {colisARecevoir.map((colis) => (
              <Card className="dark:bg-neutral-800 dark:border-neutral-700" key={colis.code}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#1CA9C9]" />
                        <span className="font-semibold">{colis.code}</span>
                        <Badge className={colis.statut === "Arrivé" ? "bg-green-500" : "bg-[#158B9A]"}>
                          {colis.statut}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-neutral-300">
                        <strong>De:</strong> {colis.expediteur} → <strong>Pour:</strong> {colis.destinataire}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-neutral-300 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {colis.telephone}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-neutral-300">
                        <strong>Arrivée prévue:</strong> {colis.dateArrivee}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {colis.statut === "Arrivé" && (
                        <>
                          <Button
                            onClick={() => openQRScanner(`Confirmer réception - ${colis.code}`)}
                            variant="outline"
                            className="border-[#1CA9C9] text-[#1CA9C9]"
                          >
                            <Camera className="mr-2 h-4 w-4" />
                            Scanner
                          </Button>
                          <Button
                            onClick={() => handleMarkAsReceived(colis.code)}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Marquer comme reçu
                          </Button>
                        </>
                      )}
                      {colis.statut === "En transit" && (
                        <Button variant="outline" disabled>
                          <Clock className="mr-2 h-4 w-4" />
                          En attente
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="retirer" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100">
                Colis disponibles pour retrait
              </h2>
              <Badge variant="secondary">{colisARetirer.length} colis</Badge>
            </div>

            {colisARetirer.map((colis) => (
              <Card className="dark:bg-neutral-800 dark:border-neutral-700" key={colis.code}>
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-[#1CA9C9]" />
                        <span className="font-semibold">{colis.code}</span>
                        <Badge className="bg-green-500">{colis.statut}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-neutral-300">
                        <strong>De:</strong> {colis.expediteur} → <strong>Pour:</strong> {colis.destinataire}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-neutral-300 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {colis.telephone}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-neutral-300">
                        <strong>Arrivé le:</strong> {colis.dateArrivee} •
                        <span className="text-orange-600 ml-1">En attente depuis {colis.joursAttente} jours</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openQRScanner(`Confirmer retrait - ${colis.code}`)}
                        variant="outline"
                        className="border-[#1CA9C9] text-[#1CA9C9]"
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Scanner
                      </Button>
                      <Button
                        onClick={() => handleMarkAsPickedUp(colis.code)}
                        className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Marquer comme retiré
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="recherche" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100">Recherche par code client</h2>
            </div>

            {/* Formulaire de recherche */}
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="searchCode" className="text-gray-700 dark:text-neutral-300">
                      Code de tracking du colis
                    </Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id="searchCode"
                        value={searchCode}
                        onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                        placeholder="Ex: DJG-9876-BF-CI"
                        className="flex-1"
                        onKeyPress={(e) => e.key === "Enter" && handleSearchByCode()}
                      />
                      <Button
                        onClick={handleSearchByCode}
                        disabled={searchLoading || !searchCode.trim()}
                        className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90"
                      >
                        {searchLoading ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        ) : (
                          <Package className="mr-2 h-4 w-4" />
                        )}
                        Rechercher
                      </Button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 dark:text-neutral-400">
                    <p>
                      💡 <strong>Instructions :</strong>
                    </p>
                    <p>• Demandez au client de vous présenter son code de tracking</p>
                    <p>• Tapez le code exactement comme indiqué</p>
                    <p>• Vérifiez l'identité du client avant de remettre le colis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Résultats de recherche */}
            {searchResult && (
              <Card className="border-2 border-[#1CA9C9] dark:bg-neutral-800 dark:border-[#1CA9C9]">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-[#0D1B2A] dark:text-neutral-100">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Colis trouvé !
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Code de tracking</p>
                        <p className="font-bold text-lg text-[#1CA9C9]">{searchResult.code}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Destinataire</p>
                        <p className="font-semibold text-lg">{searchResult.destinataire}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Téléphone</p>
                        <p className="font-medium flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {searchResult.telephone}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Expéditeur</p>
                        <p className="font-medium">{searchResult.expediteur}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Ville de départ</p>
                        <p className="font-medium">{searchResult.villeDepart}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-neutral-400">Date d'arrivée</p>
                        <p className="font-medium">{searchResult.dateArrivee}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                        <div>
                          <p className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                            Vérification d'identité requise
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            Avant de remettre le colis, vérifiez que le nom du client correspond au destinataire :{" "}
                            <strong>{searchResult.destinataire}</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleConfirmPickup(searchResult.code)}
                        className="bg-green-500 hover:bg-green-600 flex-1"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Confirmer la remise
                      </Button>
                      <Button
                        onClick={() => {
                          setSearchResult(null)
                          setSearchCode("")
                        }}
                        variant="outline"
                        className="border-gray-300"
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {showQRScanner && (
          <QRScanner title={scannerTitle} onScan={handleQRScan} onClose={() => setShowQRScanner(false)} />
        )}
      </div>
    </div>
  )
}
