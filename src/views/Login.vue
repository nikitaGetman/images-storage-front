<template>
  <v-form v-model="valid" class="login">
    <h1>Авторизация</h1>

    <v-text-field v-model="login" :rules="rules.loginRules" label="Логин" required />
    <v-text-field v-model="password" :rules="rules.passwordRules" label="Пароль" type="password" required />

    <v-alert v-if="error" color="red" dense outlined type="error">{{ error }}</v-alert>

    <div class="login__footer">
      <v-btn elevation="2" @click="auth">войти</v-btn>
      <router-link class="login__signup" :to="{ name: $options.SIGNUP_ROUTE_NAME }">Зарегистрироваться</router-link>
    </div>
  </v-form>
</template>

<script>
import { LOGIN } from '@/store/actions/types'
import { DASHBOARD_ROUTE_NAME, SIGNUP_ROUTE_NAME } from '@/constants/routes'

export default {
  name: 'Login',
  SIGNUP_ROUTE_NAME,
  data() {
    return {
      login: '',
      password: '',
      valid: false,
      error: null,
      rules: {
        loginRules: [v => !!v || 'Логин обязателен'],
        passwordRules: [v => !!v || 'Пароль обязателен']
      }
    }
  },
  methods: {
    auth() {
      if (!this.valid) return null

      return this.$store
        .dispatch(LOGIN, { login: this.login, password: this.password })
        .then(() => {
          this.$router.push({ name: DASHBOARD_ROUTE_NAME })
        })
        .catch(err => {
          this.error = err.details?.error
        })
    }
  }
}
</script>

<style lang="scss">
.login {
  width: 300px;
  text-align: center;

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__signup {
    font-size: 12px;
  }
}
</style>
