import { LOADING, SET_MODEL, LOADED } from '@/store/mutations/types'
import { throwError } from '@/utils/store'
import authService from '@/services/auth'
import * as types from './types'

const MODULE_NAME = 'account'

export default {
  [types.LOGIN]: ({ commit }, { login, password } = {}) => {
    commit(LOADING, MODULE_NAME)

    return authService
      .login({ login, password })
      .then(model => {
        commit(SET_MODEL, { name: MODULE_NAME, model })
      })
      .catch(throwError(commit, 'Ошибка авторизации'))
      .finally(() => {
        commit(LOADED, MODULE_NAME)
      })
  },

  [types.LOGOUT]: ({ commit }) => {
    commit(LOADING, MODULE_NAME)

    return authService.logout().finally(() => {
      commit(LOADED, MODULE_NAME)
    })
  }
}
