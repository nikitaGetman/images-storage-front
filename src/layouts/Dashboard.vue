<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="logout">
        <span class="mr-2">Выйти</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { LOGOUT } from '@/store/actions/types'
import { LOGIN_ROUTE_NAME } from '@/constants/routes'

export default {
  name: 'DashboardLayout',
  methods: {
    logout() {
      return this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: LOGIN_ROUTE_NAME })
      })
    }
  }
}
</script>

<style lang="scss">
// .dashboard-layout {
//   &__sidebar {}
//   &__wrapper {}
//   &__header {}
//   &__main {}
//   &__footer {}
// }
</style>
