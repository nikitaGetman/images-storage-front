<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Поиск изображений</h4>

      <v-btn elevation="1" icon @click="findImages"><v-icon>mdi-cloud-search-outline</v-icon></v-btn>
    </div>
    <div class="row">
      <v-text-field v-model="search" label="Название" type="text" />
    </div>

    <draggable v-model="images" class="list" group="images" draggable=".drag-item">
      <v-image-card v-for="(image, index) in images" :key="index" :image="image" class="drag-item" />
      <div v-if="!images.length" slot="footer">Ничего не найдено</div>
    </draggable>
  </div>
</template>

<script>
import VImageCard from '@/components/VImageCard.vue'
import draggable from 'vuedraggable'
import client from '@/http/client'

export default {
  name: 'ImagesFilter',
  components: { VImageCard, draggable },
  data() {
    return {
      search: '',
      images: []
    }
  },
  created() {
    this.findImages()
  },
  methods: {
    findImages() {
      if (!this.search) return
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
