<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Загрузить медиа с ресурса</h4>

      <v-btn elevation="1" icon @click="findImages"><v-icon>mdi-cloud-download-outline</v-icon></v-btn>
    </div>
    <div class="row">
      <v-text-field v-model="url" label="Адрес ресурса" type="text" />
    </div>

    <div class="list">
      <p v-if="loading">Запрос выполняется...</p>
      <p v-if="text">{{ text }}</p>
    </div>
  </div>
</template>

<script>
import client from '@/http/client'

export default {
  name: 'DownloadFromWeb',
  data() {
    return {
      url: '',
      loading: false,
      text: ''
    }
  },
  methods: {
    findImages() {
      if (!this.url) return

      this.loading = true
      client
        .post('/download-images-from-web', { url: this.url })
        .then(data => {
          this.text = `Добавлено ${data.length} изображений`
        })
        .finaly(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin: 0 6px;
}
</style>
