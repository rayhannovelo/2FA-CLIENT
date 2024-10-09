import { Metadata } from "next"
import { QrCode } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import DataForm from "./demo-form"
import { auth } from "@/auth"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "2FA Demo",
}

export default async function Demo() {
  const session = await auth()

  return (
    <DashboardLayout>
      <main className="flex flex-col gap-5 justify-center content-center p-5">
        <Card className="w-full">
          <CardHeader className="text-center pb-4">
            <CardTitle>{session?.user.name} 2FA DEMO</CardTitle>
            <CardDescription>Two Factor Authentication</CardDescription>
          </CardHeader>
          <CardContent className="py-0">
            <DataForm />
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </main>
    </DashboardLayout>
  )
}
