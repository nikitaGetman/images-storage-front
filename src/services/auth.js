/* eslint-disable no-underscore-dangle */
import { loadStorageItem, saveStorageItem, removeStorageItem } from '@/services/storage'

// Use for implementation of refresh and authorize methods
import client from '@/http/client'

const ACCESS_TOKEN = 'app:access'
const REFRESH_TOKEN = 'app:refresh'

class AuthService {
  _access = null

  _refresh = null

  _isTokensSync = true

  get isTokensSync() {
    return this._isTokensSync
  }

  set isTokensSync(isSync) {
    this._isTokensSync = isSync
  }

  get access() {
    return this._access
  }

  set access(token) {
    this._access = token

    if (this.isTokensSync) {
      if (token) {
        saveStorageItem(ACCESS_TOKEN, this._access)
      } else {
        removeStorageItem(ACCESS_TOKEN)
      }
    }
  }

  get refresh() {
    return this._refresh
  }

  set refresh(token) {
    this._refresh = token

    if (this.isTokensSync) {
      if (token) {
        saveStorageItem(REFRESH_TOKEN, this._refresh)
      } else {
        removeStorageItem(REFRESH_TOKEN)
      }
    }
  }

  getAuthHeader() {
    return this.access ? `Bearer ${this.access}` : undefined
  }

  setAuthTokens({ access, refresh }) {
    this.access = access
    this.refresh = refresh
  }

  hasAuthTokens() {
    return !!this.access || !!this.refresh
  }

  removeAuthTokens() {
    this.access = null
    this.refresh = null
  }

  restoreAuthTokens() {
    this.setAuthTokens({
      access: loadStorageItem(ACCESS_TOKEN),
      refresh: loadStorageItem(REFRESH_TOKEN)
    })
  }

  // implementation of refresh tokens
  refreshAuthTokens() {
    // const { refresh } = this
    // return client.POST('/auth/refresh', { refresh }).then(tokens => {
    //   this.setAuthTokens(tokens)
    // })

    return Promise.resolve({ access: 'someAccess', refresh: 'someRefresh' }).then(tokens => {
      this.setAuthTokens(tokens)
    })
  }

  login({ login, password }) {
    return client.post('/user/login/', { login, password }).then(tokens => {
      this.setAuthTokens(tokens)
    })
  }

  register({ name, login, password }) {
    return client.post('/user/signup/', { name, login, password }).then(tokens => {
      this.setAuthTokens(tokens)
    })
  }

  // eslint-disable-next-line
  fetchProfile() {
    return client.getRaw('/user/me/')
  }

  logout() {
    this.removeAuthTokens()
    return new Promise(resolve => {
      resolve()
    }).then(() => {})
  }
}

export default new AuthService()
