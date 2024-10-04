"use server"

import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

export const generateQr = async () => {
  try {
    const session = await auth()
    const response = await axios.get(
      `${backendUrl}/2fa/generate-qr?user=Rayhan`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.userToken}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const verifyToken = async (referenceId: string, token: string) => {
  try {
    const session = await auth()
    const response = await axios.post(
      `${backendUrl}/2fa/verify-token`,
      { referenceId, token },
      {
        headers: {
          Authorization: `Bearer ${session?.user.userToken}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
