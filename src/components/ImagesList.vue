<template>
  <div class="card">
    <div class="header">
      <h4 class="title">
        Ваши изображения <span class="title__count">({{ images.length }})</span>
      </h4>

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
.title__count {
  color: rgb(155, 155, 155);
}
.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
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
  max-height: 250px;
  overflow-y: auto;
  &__item {
    width: 84px;
    height: 84px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 12px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
