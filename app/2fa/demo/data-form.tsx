"use client"

import { useState, useEffect } from "react"
import { Session } from "next-auth"
import Image from "next/image"
import {
  Check,
  CircleAlert,
  LoaderPinwheel,
  QrCode,
  TriangleAlert,
} from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { generateQr, verifyToken } from "@/actions/twoFaAction"
import { Separator } from "@/components/ui/separator"
import { useDebouncedCallback } from "use-debounce"

type qrCode = {
  success: boolean
  message: string
  data: {
    referenceId?: string
    qrCode?: string
  }
}

export default function TwoFaDemo({ session }: { session: Session }) {
  const [qrCode, setQrCode] = useState<qrCode>()
  const [loading, setLoading] = useState<boolean>()
  const [isTokenValid, setIsTokenValid] = useState<boolean>()

  const handelGenerateQr = async () => {
    // setQrCode()
    setLoading(true)
    const result = await generateQr()
    setQrCode(result)
    setLoading(false)
  }

  const handleVerifyToken = useDebouncedCallback(async (token: string) => {
    if (qrCode?.data.referenceId && token) {
      const result = await verifyToken(qrCode?.data.referenceId, token)
      if (result.success) {
        setIsTokenValid(result.data.isValid)
      }
    }
  }, 100)

  useEffect(() => {}, [])

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Separator />
      <Button variant="default" onClick={handelGenerateQr}>
        <QrCode className="mr-2" /> Generate 2FA QR Code
      </Button>

      {loading ? (
        <>
          <LoaderPinwheel className="animate-spin size-[150px] my-[50px]" />
          <p>Generating QrCode...</p>
        </>
      ) : (
        qrCode &&
        (qrCode.success ? (
          <>
            <Image
              src={qrCode.data.qrCode || ""}
              alt="2FA QrCode"
              width={250}
              height={250}
              unoptimized
            />
            <p>Scan this QR Code image with PPI 2FA Authenticator</p>
            <Separator />
            <Input
              type="text"
              placeholder="Input Token"
              onChange={(e) => handleVerifyToken(e.target.value)}
            />
            {isTokenValid != null &&
              (isTokenValid ? (
                <p className="text-green-600">Token is valid</p>
              ) : (
                <p className="text-red-600">Token is invalid</p>
              ))}
          </>
        ) : (
          <>
            <TriangleAlert className="size-[250px] text-red-600" />
            <p className="text-red-600">{qrCode.message}</p>
          </>
        ))
      )}
    </div>
  )
}
