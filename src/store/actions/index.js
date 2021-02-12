import { LOADING, SET_MODEL, LOADED, UPDATE_MODEL, SET_LIST } from '@/store/mutations/types'
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

  [types.REGISTER]: ({ commit }, { name, login, password }) => {
    commit(LOADING, MODULE_NAME)

    return authService
      .register({ name, login, password })
      .then(model => {
        commit(SET_MODEL, { name: MODULE_NAME, model })
      })
      .catch(throwError(commit, 'Ошибка регистрации'))
      .finally(() => {
        commit(LOADED, MODULE_NAME)
      })
  },

  [types.FETCH_USER_PROFILE]: ({ commit }) => {
    commit(LOADING, MODULE_NAME)

    return authService
      .fetchProfile()
      .then(model => {
        commit(SET_MODEL, { name: MODULE_NAME, model })
      })
      .catch(throwError(commit, 'Ошибка загрузки профиля'))
      .finally(() => {
        commit(LOADED, MODULE_NAME)
      })
  },

  [types.FETCH_AVAILABLE_PLUGINS]: ({ commit }) => {
    commit(LOADING, MODULE_NAME)

    return authService
      .fetchPlugins()
      .then(list => {
        commit(SET_LIST, { name: 'plugins', list })
      })
      .catch(throwError(commit, 'Ошибка загрузки плагинов'))
      .finally(() => {
        commit(LOADED, MODULE_NAME)
      })
  },

  [types.UPDATE_USER_PLUGINS]: ({ commit }, { plugins }) => {
    commit(LOADING, MODULE_NAME)

    return authService
      .updatePlugins(plugins)
      .then(model => {
        console.log('action resultlm', model)
        commit(UPDATE_MODEL, { name: MODULE_NAME, model })
      })
      .catch(throwError(commit, 'Ошибка изменения плагинов'))
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
