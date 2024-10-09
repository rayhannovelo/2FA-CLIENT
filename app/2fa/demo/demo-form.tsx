"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { LoaderPinwheel, QrCode, TriangleAlert } from "lucide-react"
import { useDebouncedCallback } from "use-debounce"
import { authenticator } from "otplib"
import { generateQr, verifyToken } from "@/actions/twoFaAction"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

type qrCode = {
  success: boolean
  message: string
  data: {
    referenceId?: string
    qrCode?: string
  }
}

export default function TwoFaDemo() {
  const [qrCode, setQrCode] = useState<qrCode>()
  const [loading, setLoading] = useState<boolean>()
  const [isTokenValid, setIsTokenValid] = useState<boolean>()
  const [timeRemaining, setTimeRemaining] = useState<number>(
    authenticator.timeRemaining()
  )

  const handelGenerateQr = async () => {
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
  }, 300)

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(authenticator.timeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-3">
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
              width={225}
              height={225}
              unoptimized
              className="border"
            />
            <p>Scan this QR Code image with PPI 2FA Authenticator</p>
            <Separator />
            <p>
              Input Token{" "}
              <span className="text-muted-foreground">({timeRemaining}s)</span>
            </p>
            <InputOTP
              maxLength={6}
              onChange={(value) => handleVerifyToken(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
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
