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
      </div>

      <v-spacer></v-spacer>

      <div class="dashboard-layout__info">
        <span class="dashboard-layout__username"> Пользователь: {{ username }} </span>

        <v-menu bottom offset-y :close-on-content-click="false">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" v-bind="attrs" v-on="on">
              <span class="mr-2">Плагины</span>
              <v-icon>mdi-cog</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, index) in plugins" :key="index">
              <v-checkbox
                :input-value="item.value"
                :label="item.label"
                @change="changePlugin(item.label, $event)"
              ></v-checkbox>
            </v-list-item>
          </v-list>
        </v-menu>
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
import { LOGOUT, UPDATE_USER_PLUGINS } from '@/store/actions/types'
import { LOGIN_ROUTE_NAME } from '@/constants/routes'

export default {
  name: 'DashboardLayout',
  computed: {
    username() {
      return this.$store.state.account.model.name
    },
    plugins() {
      return this.$store.state.plugins.list.map(p => ({
        label: p,
        value: this.userPlugins.includes(p)
      }))
    },
    userPlugins() {
      return this.$store.state.account.model.plugins
    }
  },
  methods: {
    logout() {
      return this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: LOGIN_ROUTE_NAME })
      })
    },
    changePlugin(plugin, value) {
      const plugins = value ? [...this.userPlugins, plugin] : this.userPlugins.filter(p => p !== plugin)
      console.log(plugins)
      this.$store.dispatch(UPDATE_USER_PLUGINS, { plugins })
    },
    isPluginChecked(plugin) {
      return this.userPlugins.includes(plugin)
    }
  }
}
</script>

<style lang="scss">
.dashboard-layout {
  &__info {
    display: flex;
    align-items: center;
  }
  &__username {
    font-size: 20px;
    margin-right: 8px;
  }
}
</style>
