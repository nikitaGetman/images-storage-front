<template>
  <div class="card">
    <div class="header">
      <h4 class="title">
        Ваши изображения <span class="title__count">({{ images.length }})</span>
      </h4>

      <v-btn elevation="1" icon @click="loadImages"><v-icon>mdi-reload</v-icon></v-btn>
    </div>

    <draggable v-model="images" class="list" group="images" draggable=".drag-item">
      <v-image-card v-for="(image, index) in images" :key="index" :image="image" class="drag-item" />
      <p v-if="!images.length" slot="footer">Библиотека пуста</p>
    </draggable>
  </div>
</template>

<script>
import VImageCard from '@/components/VImageCard.vue'
import draggable from 'vuedraggable'
import client from '@/http/client'

export default {
  name: 'ImagesList',
  components: { VImageCard, draggable },
  data() {
    return {
      images: []
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
}
</style>
