<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Поиск</h4>
      <v-btn elevation="1" icon @click="findImages"><v-icon>mdi-cloud-search-outline</v-icon></v-btn>
    </div>
    <div class="row">
      <v-text-field v-model="search" label="Название" type="text" hide-details light single-line />
      <v-select
        v-model="tag"
        :items="tags"
        label="Тэг"
        hide-details
        item-text="tag"
        item-value="id"
        light
        clearable
        single-line
      ></v-select>
    </div>

    <div class="list">
      <v-image-card v-for="(image, index) in images" :key="index" :image="image" class="drag-item" />
      <div v-if="!images.length" slot="footer" class="no-results">Ничего не найдено</div>
    </div>
  </div>
</template>

<script>
import VImageCard from '@/components/VImageCard.vue'
import client from '@/http/client'

export default {
  name: 'ImagesFilter',
  components: { VImageCard },
  data() {
    return {
      search: '',
      tag: null,
      images: []
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags.list
    }
  },
  created() {
    this.findImages()
  },
  methods: {
    findImages() {
      if (!this.search && !this.tag) return
      client.getRaw('/image-filters', { params: { name: this.search, tag: this.tag } }).then(data => {
        this.images = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  margin: 0 4px 12px;
  .v-input {
    padding: 0 !important;
  }
}
.no-results {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
  text-align: center;
  color: rgb(172, 172, 172);
}
</style>
