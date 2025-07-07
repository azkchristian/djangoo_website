"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X } from "lucide-react"

interface QRScannerProps {
  onScan: (result: string) => void
  onClose: () => void
  title?: string
}

export function QRScanner({ onScan, onClose, title = "Scanner le QR code" }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stream, setStream] = useState<MediaStream | null>(null)

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Caméra arrière
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        setStream(mediaStream)
        setIsScanning(true)
        setError(null)
      }
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err)
      setError("Impossible d'accéder à la caméra. Vérifiez les permissions.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsScanning(false)
  }

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    context.drawImage(video, 0, 0)

    // Simulation de détection QR code (dans un vrai projet, utiliser une librairie comme jsQR)
    // Pour la démo, on simule un scan réussi après quelques secondes
    setTimeout(() => {
      const mockQRCode =
        "DJG-" +
        Math.floor(Math.random() * 9999)
          .toString()
          .padStart(4, "0") +
        "-CI-SN"
      onScan(mockQRCode)
    }, 2000)
  }

  const handleManualInput = () => {
    const code = prompt("Entrez le code du colis manuellement:")
    if (code) {
      onScan(code)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? (
            <div className="text-center space-y-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
              <Button onClick={handleManualInput} className="w-full">
                Saisir manuellement
              </Button>
            </div>
          ) : (
            <>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg bg-gray-900"
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Overlay de visée */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 border-2 border-[#1CA9C9] rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#1CA9C9]"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#1CA9C9]"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#1CA9C9]"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#1CA9C9]"></div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Positionnez le QR code dans le cadre pour le scanner</p>

                <div className="flex gap-2">
                  <Button onClick={captureFrame} className="flex-1 bg-[#1CA9C9] hover:bg-[#1CA9C9]/90">
                    <Camera className="mr-2 h-4 w-4" />
                    Scanner
                  </Button>
                  <Button variant="outline" onClick={handleManualInput}>
                    Saisir manuellement
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
