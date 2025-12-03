'use client'

import { useEffect, useState } from 'react'
import { decodeToken } from '@/lib/utils'

export const AllowedAccess = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) => {
  const [userRoles, setUserRoles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const decodedUser = token ? decodeToken(token) : null
    setUserRoles(decodedUser?.roles || [])
    setLoading(false)
  }, [])

  const hasAccess = () => {
    if (allowedRoles.length === 0) return true
    if (userRoles.includes('admin')) return true
    return allowedRoles.some((role) => userRoles.includes(role))
  }

  if (loading) return null 

  // OPTIONAL: Redirect for unauthorized users
  // if (!hasAccess()) {
  //   return <div>You do not have access to this page.</div>
  // }

  return <>{children}</>
}

export default AllowedAccess
