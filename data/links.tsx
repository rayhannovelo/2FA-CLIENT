import { Users, UserCog, UserCheck, User, FileText, Home } from "lucide-react"

export const defaultLinks = [
  { name: "Main Navigation", href: "", icon: null },
  { name: "Dashboard", href: "/dashboard", icon: Home },
]

export const superadminLinks = [
  { name: "Main Navigation", href: "", icon: null },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "2FA Management", href: "", icon: null },
  { name: "2FA", href: "/2fa", icon: FileText },
  { name: "User Management", href: "", icon: null },
  { name: "Users", href: "/users", icon: Users },
  { name: "User Roles", href: "/user-roles", icon: UserCog },
  { name: "User Statuses", href: "/user-statuses", icon: UserCheck },
]

export const userAppLinks = [
  { name: "Main Navigation", href: "", icon: null },
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "2FA Management", href: "", icon: null },
  { name: "2FA Demo", href: "/2fa/demo", icon: FileText },
]

export const getLinks = (userRoleId: number | undefined) => {
  switch (userRoleId) {
    case 1:
      return superadminLinks
    case 2:
      return userAppLinks
    default:
      return defaultLinks
  }
}
