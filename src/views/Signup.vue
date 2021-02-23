<template>
  <v-form v-model="valid" class="signup">
    <h1>Регистрация</h1>

    <v-text-field v-model="name" :rules="rules.name" label="Имя" required />
    <v-text-field v-model="login" :rules="rules.login" label="Логин" required />
    <v-text-field v-model="password" :rules="rules.password" label="Пароль" type="password" required />
    <v-text-field
      v-model="passwordConfirm"
      :rules="rules.passwordConfirm"
      label="Подтвердите пароль"
      type="password"
      required
    />

    <v-alert v-if="error" color="red" dense outlined type="error">{{ error }}</v-alert>

    <div class="signup__footer">
      <v-btn elevation="2" @click="signup">Зарегестрироваться</v-btn>
      <router-link class="signup__link" :to="{ name: $options.LOGIN_ROUTE_NAME }">Уже есть аккаунт?</router-link>
    </div>
  </v-form>
</template>

<script>
import { REGISTER } from '@/store/actions/types'
import { DASHBOARD_ROUTE_NAME, LOGIN_ROUTE_NAME } from '@/constants/routes'

export default {
  name: 'Signup',
  LOGIN_ROUTE_NAME,
  data() {
    return {
      name: '',
      login: '',
      password: '',
      passwordConfirm: '',
      valid: false,
      error: null,
      rules: {
        name: [v => !!v || 'Имя обязательно'],
        login: [v => !!v || 'Логин обязателен'],
        password: [v => !!v || 'Пароль обязателен'],
        passwordConfirm: [v => v === this.password || 'Пароли не совпадают']
      }
    }
  },
  methods: {
    signup() {
      if (!this.valid) return null

      const { login, password, name } = this
      return this.$store
        .dispatch(REGISTER, { login, password, name })
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
.signup {
  width: 300px;
  text-align: center;

  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__link {
    font-size: 12px;
  }
}
</style>
