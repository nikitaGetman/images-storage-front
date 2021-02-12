import { LOGIN_ROUTE_NAME } from '@/constants/routes'
import { FETCH_USER_PROFILE, LOGOUT } from '@/store/actions/types'

export default function loadProfile({ next, store }) {
  const { isProfileLoaded } = store.getters

  if (!isProfileLoaded) {
    return store
      .dispatch(FETCH_USER_PROFILE)
      .then(() => next())
      .catch(() => {
        return store.dispatch(LOGOUT).then(() => next({ name: LOGIN_ROUTE_NAME }))
      })
      .catch(() => next(false))
  }

  return next()
}
