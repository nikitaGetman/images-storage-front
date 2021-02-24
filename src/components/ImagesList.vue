<template>
  <div class="card">
    <div class="header">
      <h4 class="title">
        Коллекция <span class="title__count">({{ images.length }})</span>
      </h4>
      <div class="header__actions">
        <v-btn elevation="1" icon @click="toggleView"
          ><v-icon>{{ viewIcon }}</v-icon></v-btn
        >
        <v-btn elevation="1" icon @click="loadImages"><v-icon>mdi-reload</v-icon></v-btn>
      </div>
    </div>

    <draggable v-model="images" class="list" group="images" draggable=".drag-item">
      <v-image-card
        v-for="(image, index) in images"
        :key="index"
        :image="image"
        class="drag-item"
        :view="view"
        :is-active="activeIndex === index"
        @right="goRight"
        @left="goLeft"
        @activate="activate(index, $event)"
        @reload="loadImages"
      />
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
      images: [],
      view: 'grid',
      activeIndex: null
    }
  },
  computed: {
    viewIcon() {
      return this.view === 'grid' ? 'mdi-view-grid-outline' : 'mdi-view-agenda-outline'
    }
  },
  created() {
    this.loadImages()
  },
  methods: {
    goRight() {
      this.activeIndex += 1
      if (this.activeIndex > this.images.length - 1) this.activeIndex = 0
    },
    goLeft() {
      this.activeIndex -= 1
      if (this.activeIndex < 0) this.activeIndex = this.images.length - 1
    },
    activate(index, val) {
      this.activeIndex = val ? index : null
    },
    toggleView() {
      if (this.view === 'grid') this.view = 'list'
      else this.view = 'grid'
    },
    loadImages() {
      client.getRaw('/images-list').then(({ media }) => {
        this.images = media
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
