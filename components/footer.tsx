import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-neutral-900 text-gray-800 dark:text-neutral-200 py-12 border-t border-gray-200 dark:border-neutral-700 transition-colors">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/images/djongoo-logo-new.png" alt="Djongoo" className="h-10 w-auto" />
            </div>
            <p className="text-gray-600 dark:text-neutral-400">
              Votre partenaire de confiance pour l'envoi de colis en Afrique de l'Ouest.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-neutral-200">Services</h3>
            <ul className="space-y-2 text-gray-600 dark:text-neutral-400">
              <li>
                <Link href="/envoyer" className="hover:text-[#1CA9C9] transition-colors">
                  Envoyer un colis
                </Link>
              </li>
              <li>
                <Link href="/suivi" className="hover:text-[#1CA9C9] transition-colors">
                  Suivre un colis
                </Link>
              </li>
              <li>
                <Link href="/point-relais" className="hover:text-[#1CA9C9] transition-colors">
                  Points relais
                </Link>
              </li>
              <li>
                <Link href="/devenir-livreur" className="hover:text-[#1CA9C9] transition-colors">
                  Devenir livreur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-neutral-200">Support</h3>
            <ul className="space-y-2 text-gray-600 dark:text-neutral-400">
              <li>
                <Link href="#" className="hover:text-[#1CA9C9] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#1CA9C9] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#1CA9C9] transition-colors">
                  Aide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-gray-800 dark:text-neutral-200">Contact</h3>
            <div className="text-gray-600 dark:text-neutral-400 space-y-2">
              <p>Email: contact@djongoo.com</p>
              <p>Tél: +225 XX XX XX XX</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-neutral-700 mt-8 pt-8 text-center text-gray-500 dark:text-neutral-500">
          <p>&copy; 2024 Djongoo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
