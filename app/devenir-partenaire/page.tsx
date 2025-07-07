"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Truck, Eye, EyeOff, RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DevenirPartenairePage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [captchaValue, setCaptchaValue] = useState("")
  const [captchaQuestion, setCaptchaQuestion] = useState({ question: "", answer: "" })

  // États pour les formulaires
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    userType: "",
  })

  const [signupData, setSignupData] = useState({
    userType: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
    ville: "",
    adresse: "",
    experience: "",
    vehicule: "",
    motivation: "",
    acceptTerms: false,
  })

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

  // Génération du captcha
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1
    const num2 = Math.floor(Math.random() * 10) + 1
    const operators = ["+", "-", "*"]
    const operator = operators[Math.floor(Math.random() * operators.length)]

    let answer
    switch (operator) {
      case "+":
        answer = num1 + num2
        break
      case "-":
        answer = num1 - num2
        break
      case "*":
        answer = num1 * num2
        break
      default:
        answer = num1 + num2
    }

    setCaptchaQuestion({
      question: `${num1} ${operator} ${num2} = ?`,
      answer: answer.toString(),
    })
    setCaptchaValue("")
  }

  // Initialiser le captcha au chargement
  useState(() => {
    generateCaptcha()
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      })

      if (!res.ok) {
        const { error } = await res.json()
        return alert(error || "Échec de la connexion")
      }

      const result = await res.json()
      alert("Connexion réussie !")
      router.push(`/${loginData.userType}`)
    } catch (error) {
      console.error("Erreur lors de la connexion :", error)
      alert("Erreur serveur. Veuillez réessayer plus tard.")
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    if (!signupData.acceptTerms) {
      alert("Veuillez accepter les conditions d'utilisation")
      return
    }

    if (signupData.password !== signupData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return
    }

    if (captchaValue !== captchaQuestion.answer) {
      alert("Captcha incorrect")
      return
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      })

      if (!res.ok) {
        const { error } = await res.json()
        return alert(error || "Erreur lors de l'inscription")
      }

      alert("Inscription réussie !")
      router.push(`/${signupData.userType}`)
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error)
      alert("Erreur serveur. Veuillez réessayer plus tard.")
    }
  }

  const handleInputChange = (field, value, formType) => {
    if (formType === "login") {
      setLoginData((prev) => ({ ...prev, [field]: value }))
    } else {
      setSignupData((prev) => ({ ...prev, [field]: value }))
    }
  }

  return (
    <div className="min-h-screen bg-[#F4FBFD] dark:bg-neutral-900 py-8 transition-colors">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#0D1B2A] dark:text-neutral-100 mb-4">Devenir partenaire Djongoo</h1>
          <p className="text-gray-600 dark:text-neutral-300">
            Rejoignez notre réseau en tant que point relais ou livreur
          </p>
        </div>

        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Se connecter</TabsTrigger>
            <TabsTrigger value="signup">S'inscrire</TabsTrigger>
          </TabsList>

          {/* Onglet Connexion */}
          <TabsContent value="login">
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="text-center text-[#0D1B2A] dark:text-neutral-100">Connexion partenaire</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="userType">
                      Type de compte
                    </Label>
                    <Select
                      value={loginData.userType}
                      onValueChange={(value) => handleInputChange("userType", value, "login")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre type de compte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point-relais">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Point Relais
                          </div>
                        </SelectItem>
                        <SelectItem value="livreur">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Livreur
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="email">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => handleInputChange("email", e.target.value, "login")}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div>
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="password">
                      Mot de passe
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => handleInputChange("password", e.target.value, "login")}
                        placeholder="••••••••"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-[#1CA9C9] hover:bg-[#1CA9C9]/90">
                    Se connecter
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-[#1CA9C9]">
                      Mot de passe oublié ?
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Onglet Inscription */}
          <TabsContent value="signup">
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="text-center text-[#0D1B2A] dark:text-neutral-100">
                  Créer un compte partenaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  {/* Type de compte */}
                  <div>
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="signupUserType">
                      Type de compte *
                    </Label>
                    <Select
                      value={signupData.userType}
                      onValueChange={(value) => handleInputChange("userType", value, "signup")}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez votre type de compte" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="point-relais">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            Point Relais
                          </div>
                        </SelectItem>
                        <SelectItem value="livreur">
                          <div className="flex items-center gap-2">
                            <Truck className="h-4 w-4" />
                            Livreur
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Informations personnelles */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="prenom">
                        Prénom *
                      </Label>
                      <Input
                        id="prenom"
                        value={signupData.prenom}
                        onChange={(e) => handleInputChange("prenom", e.target.value, "signup")}
                        placeholder="Jean"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="nom">
                        Nom *
                      </Label>
                      <Input
                        id="nom"
                        value={signupData.nom}
                        onChange={(e) => handleInputChange("nom", e.target.value, "signup")}
                        placeholder="Kouassi"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="signupEmail">
                        Email *
                      </Label>
                      <Input
                        id="signupEmail"
                        type="email"
                        value={signupData.email}
                        onChange={(e) => handleInputChange("email", e.target.value, "signup")}
                        placeholder="jean@example.com"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="telephone">
                        Téléphone *
                      </Label>
                      <Input
                        id="telephone"
                        value={signupData.telephone}
                        onChange={(e) => handleInputChange("telephone", e.target.value, "signup")}
                        placeholder="+225 XX XX XX XX"
                        required
                      />
                    </div>
                  </div>

                  {/* Localisation */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="ville">
                        Ville *
                      </Label>
                      <Select
                        value={signupData.ville}
                        onValueChange={(value) => handleInputChange("ville", value, "signup")}
                      >
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
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="adresse">
                        Adresse *
                      </Label>
                      <Input
                        id="adresse"
                        value={signupData.adresse}
                        onChange={(e) => handleInputChange("adresse", e.target.value, "signup")}
                        placeholder="Votre adresse complète"
                        required
                      />
                    </div>
                  </div>

                  {/* Champs spécifiques aux livreurs */}
                  {signupData.userType === "livreur" && (
                    <>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-700 dark:text-neutral-300" htmlFor="vehicule">
                            Type de véhicule *
                          </Label>
                          <Select
                            value={signupData.vehicule}
                            onValueChange={(value) => handleInputChange("vehicule", value, "signup")}
                          >
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
                          <Label className="text-gray-700 dark:text-neutral-300" htmlFor="experience">
                            Expérience *
                          </Label>
                          <Select
                            value={signupData.experience}
                            onValueChange={(value) => handleInputChange("experience", value, "signup")}
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
                      </div>
                    </>
                  )}

                  {/* Motivation */}
                  <div>
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="motivation">
                      Motivation *
                    </Label>
                    <Textarea
                      id="motivation"
                      value={signupData.motivation}
                      onChange={(e) => handleInputChange("motivation", e.target.value, "signup")}
                      placeholder={`Pourquoi voulez-vous devenir ${
                        signupData.userType === "livreur" ? "livreur" : "point relais"
                      } Djongoo ?`}
                      rows={3}
                      required
                    />
                  </div>

                  {/* Mots de passe */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="signupPassword">
                        Mot de passe *
                      </Label>
                      <Input
                        id="signupPassword"
                        type="password"
                        value={signupData.password}
                        onChange={(e) => handleInputChange("password", e.target.value, "signup")}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                    <div>
                      <Label className="text-gray-700 dark:text-neutral-300" htmlFor="confirmPassword">
                        Confirmer le mot de passe *
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={signupData.confirmPassword}
                        onChange={(e) => handleInputChange("confirmPassword", e.target.value, "signup")}
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* Captcha */}
                  <div className="space-y-2">
                    <Label className="text-gray-700 dark:text-neutral-300" htmlFor="captcha">
                      Vérification anti-robot *
                    </Label>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg">
                        <span className="font-mono text-lg">{captchaQuestion.question}</span>
                        <Button type="button" variant="ghost" size="sm" onClick={generateCaptcha} className="p-1">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                      <Input
                        id="captcha"
                        value={captchaValue}
                        onChange={(e) => setCaptchaValue(e.target.value)}
                        placeholder="Réponse"
                        className="w-24"
                        required
                      />
                    </div>
                  </div>

                  {/* Conditions d'utilisation */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={signupData.acceptTerms}
                      onCheckedChange={(checked) =>
                        setSignupData((prev) => ({ ...prev, acceptTerms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="terms" className="text-sm">
                      J'accepte les{" "}
                      <Button variant="link" className="p-0 h-auto text-[#1CA9C9]">
                        conditions d'utilisation
                      </Button>{" "}
                      et la{" "}
                      <Button variant="link" className="p-0 h-auto text-[#1CA9C9]">
                        politique de confidentialité
                      </Button>
                    </Label>
                  </div>

                  <Button type="submit" className="w-full bg-[#158B9A] hover:bg-[#158B9A]/90 text-lg py-3">
                    Créer mon compte
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
