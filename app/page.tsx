import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, MapPin, Users, Truck, Store, Car } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4FBFD] to-white dark:from-neutral-900 dark:to-neutral-800 transition-colors">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-6">
            Envoyez, suivez, recevez
          </h1>
          <p className="text-xl md:text-2xl text-[#0D1B2A] dark:text-neutral-200 mb-4">partout en Afrique de l'Ouest</p>
          <p className="text-lg text-gray-600 dark:text-neutral-300 mb-12 max-w-2xl mx-auto">
            Djongoo connecte vos colis à travers l'Afrique de l'Ouest grâce à notre réseau de points relais de
            confiance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/envoyer">
              <Button size="lg" className="bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 text-white px-8 py-4 text-lg">
                <Package className="mr-2 h-5 w-5" />
                Envoyer un colis
              </Button>
            </Link>
            <Link href="/suivi">
              <Button
                size="lg"
                variant="outline"
                className="border-[#1CA9C9] text-[#1CA9C9] hover:bg-[#1CA9C9] hover:text-white px-8 py-4 text-lg bg-transparent dark:border-[#1CA9C9] dark:text-[#1CA9C9] dark:hover:bg-[#1CA9C9] dark:hover:text-white"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Suivre un colis
              </Button>
            </Link>
            <Link href="/devenir-partenaire">
              <Button size="lg" className="bg-[#158B9A] hover:bg-[#158B9A]/90 text-white px-8 py-4 text-lg">
                <Users className="mr-2 h-5 w-5" />
                Devenir point relais
              </Button>
            </Link>
            <Link href="/devenir-partenaire">
              <Button
                size="lg"
                variant="outline"
                className="border-[#158B9A] text-[#158B9A] hover:bg-[#158B9A] hover:text-white px-8 py-4 text-lg bg-transparent dark:border-[#158B9A] dark:text-[#158B9A] dark:hover:bg-[#158B9A] dark:hover:text-white"
              >
                <Truck className="mr-2 h-5 w-5" />
                Devenir livreur
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-[#0D1B2A] dark:text-neutral-100 mb-12">
          Comment ça marche ?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center border-2 border-[#1CA9C9]/20 hover:border-[#1CA9C9]/40 transition-colors dark:bg-neutral-800 dark:border-[#1CA9C9]/30 dark:hover:border-[#1CA9C9]/50">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#1CA9C9] rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-4">1. Déposez</h3>
              <p className="text-gray-600 dark:text-neutral-300">
                Déposez votre colis dans l'un de nos points relais partenaires près de chez vous.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-[#1CA9C9]/20 hover:border-[#1CA9C9]/40 transition-colors dark:bg-neutral-800 dark:border-[#1CA9C9]/30 dark:hover:border-[#1CA9C9]/50">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#158B9A] rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-4">2. Suivez</h3>
              <p className="text-gray-600 dark:text-neutral-300">
                Suivez votre colis en temps réel grâce à votre code de tracking unique.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-2 border-[#1CA9C9]/20 hover:border-[#1CA9C9]/40 transition-colors dark:bg-neutral-800 dark:border-[#1CA9C9]/30 dark:hover:border-[#1CA9C9]/50">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-[#1CA9C9] rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#0D1B2A] dark:text-neutral-100 mb-4">3. Récupérez</h3>
              <p className="text-gray-600 dark:text-neutral-300">
                Le destinataire récupère le colis dans le point relais de destination.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="bg-white dark:bg-neutral-900 py-16 transition-colors">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#0D1B2A] dark:text-neutral-100 mb-12">
            Rejoignez notre réseau
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Point Relais */}
            <Card className="border-2 border-[#1CA9C9]/20 hover:border-[#1CA9C9]/40 transition-colors dark:bg-neutral-800 dark:border-[#1CA9C9]/30 dark:hover:border-[#1CA9C9]/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#1CA9C9] rounded-full flex items-center justify-center">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100">Devenez Point Relais</h3>
                    <p className="text-[#1CA9C9] font-semibold">Monétisez votre commerce</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
                  <strong>Vous avez une boutique, un magasin ou un commerce ?</strong> Transformez votre espace en point
                  relais Djongoo et générez des revenus supplémentaires en accueillant les colis de vos clients.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#1CA9C9] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Revenus supplémentaires garantis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#1CA9C9] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Augmentez votre clientèle</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#1CA9C9] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Formation et support inclus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#1CA9C9] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Aucun investissement requis</span>
                  </div>
                </div>

                <Link href="/devenir-partenaire">
                  <Button className="w-full bg-[#1CA9C9] hover:bg-[#1CA9C9]/90 text-lg py-3">
                    <Store className="mr-2 h-5 w-5" />
                    Devenir Point Relais
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Livreur */}
            <Card className="border-2 border-[#158B9A]/20 hover:border-[#158B9A]/40 transition-colors dark:bg-neutral-800 dark:border-[#158B9A]/30 dark:hover:border-[#158B9A]/50">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#158B9A] rounded-full flex items-center justify-center">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[#0D1B2A] dark:text-neutral-100">Devenez Livreur</h3>
                    <p className="text-[#158B9A] font-semibold">Votre véhicule, votre business</p>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-neutral-300 mb-6 text-lg leading-relaxed">
                  <strong>Vous possédez une moto, une voiture, un bus ou un camion avec permis valide ?</strong>{" "}
                  Rejoignez notre équipe de livreurs et créez votre propre activité de livraison flexible et rentable.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#158B9A] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Jusqu'à 200 000 FCFA/mois</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#158B9A] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Horaires flexibles</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#158B9A] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Trajets inter-pays</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#158B9A] rounded-full"></div>
                    <span className="text-gray-700 dark:text-neutral-300">Support 24/7</span>
                  </div>
                </div>

                <Link href="/devenir-partenaire">
                  <Button className="w-full bg-[#158B9A] hover:bg-[#158B9A]/90 text-lg py-3">
                    <Car className="mr-2 h-5 w-5" />
                    Devenir Livreur
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="bg-[#F4FBFD] dark:bg-neutral-800 py-16 transition-colors">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <img
              src="/images/djongoo-logo-new.png"
              alt="Djongoo - Livraison en Afrique de l'Ouest"
              className="h-32 w-auto mx-auto mb-8"
            />
            <h2 className="text-2xl md:text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">
              La solution de livraison qui connecte l'Afrique de l'Ouest
            </h2>
            <p className="text-lg text-gray-600 dark:text-neutral-300 leading-relaxed">
              Djongoo révolutionne l'envoi de colis en Afrique de l'Ouest grâce à un réseau de confiance qui unit les
              communautés à travers les frontières.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-100 dark:bg-neutral-900 py-16 transition-colors">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-[#1CA9C9] mb-2">500+</div>
              <div className="text-lg text-gray-700 dark:text-white">Points relais</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1CA9C9] mb-2">200+</div>
              <div className="text-lg text-gray-700 dark:text-white">Livreurs actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1CA9C9] mb-2">8</div>
              <div className="text-lg text-gray-700 dark:text-white">Pays couverts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-[#1CA9C9] mb-2">10k+</div>
              <div className="text-lg text-gray-700 dark:text-white">Colis livrés</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
