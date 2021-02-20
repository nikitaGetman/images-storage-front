<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Поиск изображений</h4>

      <v-btn elevation="1" icon @click="findImages"><v-icon>mdi-cloud-search-outline</v-icon></v-btn>
    </div>
    <div class="row">
      <v-text-field v-model="search" label="Название" type="text" />
    </div>

    <div class="list">
      <p v-if="!images.length">Ничего не найдено</p>
      <div v-for="(image, index) of images" :key="index" class="list__item">
        <img :src="'http://localhost:3000/images/' + id + '/' + image" alt="image" />
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/http/client'

export default {
  name: 'ImagesFilter',
  data() {
    return {
      search: '',
      images: []
    }
  },
  computed: {
    id() {
      return this.$store.state.account.model.id
    }
  },
  created() {
    this.findImages()
  },
  methods: {
    findImages() {
      client.getRaw('/image-filters', { params: { name: this.search } }).then(data => {
        this.images = data
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
