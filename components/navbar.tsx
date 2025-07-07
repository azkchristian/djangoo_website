"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, Globe } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState("Côte d'Ivoire")

  const countries = [
    { code: "CI", name: "Côte d'Ivoire", flag: "🇨🇮" },
    { code: "SN", name: "Sénégal", flag: "🇸🇳" },
    { code: "GH", name: "Ghana", flag: "🇬🇭" },
    { code: "TG", name: "Togo", flag: "🇹🇬" },
    { code: "ML", name: "Mali", flag: "🇲🇱" },
    { code: "BF", name: "Burkina Faso", flag: "🇧🇫" },
    { code: "GN", name: "Guinée", flag: "🇬🇳" },
    { code: "NE", name: "Niger", flag: "🇳🇪" },
  ]

  const menuItems = [
    { href: "/", label: "Accueil" },
    { href: "/suivi", label: "Suivi" },
    { href: "/envoyer", label: "Envoyer" },
    { href: "/points-relais", label: "Points relais" },
  ]

  return (
    <>
      <nav className="bg-white dark:bg-neutral-900 shadow-sm border-b border-gray-200 dark:border-neutral-700 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/djongoo-logo-new.png" alt="Djongoo" className="h-24 w-auto" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-[#0D1B2A] dark:text-neutral-100 hover:text-[#1CA9C9] dark:hover:text-[#1CA9C9] transition-colors font-medium"
              >
                Accueil
              </Link>
              <Link
                href="/suivi"
                className="text-[#0D1B2A] dark:text-neutral-100 hover:text-[#1CA9C9] dark:hover:text-[#1CA9C9] transition-colors font-medium"
              >
                Suivi
              </Link>
              <Link
                href="/envoyer"
                className="text-[#0D1B2A] dark:text-neutral-100 hover:text-[#1CA9C9] dark:hover:text-[#1CA9C9] transition-colors font-medium"
              >
                Envoyer
              </Link>
              <Link
                href="/points-relais"
                className="text-[#0D1B2A] dark:text-neutral-100 hover:text-[#1CA9C9] dark:hover:text-[#1CA9C9] transition-colors font-medium"
              >
                Points relais
              </Link>
              <Link href="/devenir-partenaire">
                <Button className="bg-[#158B9A] hover:bg-[#158B9A]/90 text-white px-6 py-2">Devenir partenaire</Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#0D1B2A] dark:text-neutral-100 z-50 relative"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute top-0 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-5 left-0 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    isOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="py-4 border-t border-gray-200 dark:border-neutral-700">
              <div className="flex flex-col space-y-4">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[#0D1B2A] dark:text-neutral-100 hover:text-[#1CA9C9] transition-all duration-300 font-medium transform ${
                      isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${index * 100}ms` : "0ms",
                    }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/devenir-partenaire"
                  className={`transform transition-all duration-300 ${
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${menuItems.length * 100}ms` : "0ms",
                  }}
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="bg-[#158B9A] hover:bg-[#158B9A]/90 text-white w-full">Devenir partenaire</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Utility Bar */}
      <div className="bg-[#158B9A] text-white py-4 transition-colors">
        <div className="container mx-auto px-4">
          <div className="flex justify-end items-center space-x-8">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Country Selection */}
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5" />
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="bg-transparent border-none text-white h-auto p-0 focus:ring-0 focus:ring-offset-0 text-base">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      <div className="flex items-center space-x-2">
                        <span>{country.flag}</span>
                        <span>{country.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Login */}
            <Link
              href="/devenir-partenaire"
              className="flex items-center space-x-3 hover:text-gray-200 transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-base font-medium">Connexion</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
