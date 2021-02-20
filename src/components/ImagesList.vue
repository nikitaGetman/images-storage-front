<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Ваши изображения</h4>

      <v-btn elevation="1" icon @click="loadImages"><v-icon>mdi-reload</v-icon></v-btn>
    </div>

    <div class="list">
      <p v-if="!images.length">Библиотека пуста</p>
      <div v-for="(image, index) of images" :key="index" class="list__item">
        <img :src="'http://localhost:3000/images/' + id + '/' + image" alt="image" />
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/http/client'

export default {
  name: 'ImagesList',
  data() {
    return {
      images: []
    }
  },
  computed: {
    id() {
      return this.$store.state.account.model.id
    }
  },
  created() {
    this.loadImages()
  },
  methods: {
    loadImages() {
      client.getRaw('/images-list').then(data => {
        this.images = data
      })
    }
  }
}
</script>

<style lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
p {
  flex-grow: 1;
  margin: 64px 0;
  text-align: center;
  color: #aaa;
}
.list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: 100px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
      margin-right: 8px;
      margin-bottom: 8px;
      border-radius: 12px;
    }
  }
}
</style>
