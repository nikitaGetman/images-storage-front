<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Загрузить медиа</h4>

      <v-btn elevation="1" icon @click="upload"><v-icon>mdi-cloud-download-outline</v-icon></v-btn>
    </div>
    <div class="row">
      <v-file-input v-model="file" chips show-size truncate-length="10"></v-file-input>
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
  name: 'DownloadFromUser',
  data() {
    return {
      loading: false,
      file: null,
      text: ''
    }
  },
  methods: {
    upload() {
      if (!this.file) return

      const formData = new FormData()
      formData.append('image', this.file)

      this.loading = true
      client
        .post('/download-image-from-user', formData)
        .then(data => {
          this.text = `Изображение ${data.data.name} загружено`
          this.file = null
        })
        .finally(() => {
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
