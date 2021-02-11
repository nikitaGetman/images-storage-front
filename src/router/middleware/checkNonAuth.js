import authService from '@/services/auth'
import { DASHBOARD_ROUTE_NAME } from '@/constants/routes'

export default function checkNonAuth({ next }) {
  const hasAuthTokens = authService.hasAuthTokens()
  if (hasAuthTokens) return next({ name: DASHBOARD_ROUTE_NAME })
  return next()
}
