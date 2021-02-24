<template>
  <div class="image-card" :class="{ 'image-card__row': view === 'list' }" @click="openFullView">
    <template v-if="view === 'grid'">
      <img :src="previewSrc" alt="image" />
    </template>
    <template v-if="view === 'list'">
      <div class="image-card__item">
        <div class="image-card__item-image"><img :src="previewSrc" alt="image" /></div>
        <div class="image-card__item-name">{{ image.name }}</div>
        <div v-if="tag" class="image-card__item-tag">
          <v-chip>{{ tag }}</v-chip>
        </div>
      </div>
    </template>

    <div v-if="fullView" class="image-card__full" @click.stop="fullView = false">
      <div class="image-card__wrapper" @click.stop>
        <v-img v-if="!isVideo" :src="src" :lazy-src="src" class="grey lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div v-else class="image-card__video">
          <vue-player
            v-model="playing"
            :src="src"
            poster="https://via.placeholder.com/150"
            title="this is a title"
          ></vue-player>
        </div>

        <div class="image-card__info">
          <div class="image-card__name">{{ image.name }}</div>

          <div class="image-card__actions">
            <v-select
              class="image-card__tag"
              :items="tags"
              label="Тэг"
              :value="image.tag"
              hide-details
              item-text="tag"
              item-value="id"
              light
              clearable
              single-line
              solo
              @change="changeTag"
            ></v-select>

            <v-btn elevation="1" class="image-card__download" @click.stop="download"
              >Скачать <v-icon>mdi-download</v-icon></v-btn
            >
          </div>
        </div>

        <div class="image-card__right">
          <v-btn elevation="1" icon class="image-card__download" @click.stop="goRight">
            <v-icon>mdi-chevron-right-circle</v-icon>
          </v-btn>
        </div>
        <div class="image-card__left">
          <v-btn elevation="1" icon class="image-card__download" @click.stop="goLeft">
            <v-icon>mdi-chevron-left-circle</v-icon>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import client from '@/http/client'
import vuePlayer from '@algoz098/vue-player'

export default {
  name: 'VImageCard',
  components: { vuePlayer },
  props: {
    image: { type: Object, required: true },
    view: { type: String, default: 'grid' },
    isActive: { type: Boolean, default: false }
  },
  data() {
    return {
      playing: false
    }
  },
  computed: {
    fullView: {
      get() {
        return this.isActive
      },
      set(val) {
        this.$emit('activate', val)
      }
    },
    player() {
      return this.$refs.videoPlayer.player
    },
    id() {
      return this.$store.state.account.model.id
    },
    previewSrc() {
      return this.isVideo ? 'http://localhost:3000/images/video_preview.jpg' : this.src
    },
    src() {
      return `http://localhost:3000/images/${this.id}/${this.image.name}`
    },
    tags() {
      return this.$store.state.tags.list
    },
    tag() {
      return this.image.tag ? this.tags.find(t => t.id === this.image.tag).tag : null
    },
    isVideo() {
      return this.image.name.includes('mp4') || this.image.name.includes('webm')
    }
  },
  methods: {
    openFullView() {
      this.fullView = true
    },
    changeTag(tag) {
      client.post('/user/image/tag/', { image: this.image.name, tag })
      this.$emit('reload')
    },
    download() {
      console.log('download')
      const a = document.createElement('a')
      a.href = this.src
      a.target = '_blank'
      a.download = this.image
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },
    goLeft() {
      this.$emit('left')
    },
    goRight() {
      this.$emit('right')
    }
  }
}
</script>

<style lang="scss">
.image-card {
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

  &__row {
    width: 100%;
    height: unset;
    margin-right: 0;
    border-radius: 0;
  }
  &__item {
    display: flex;
    align-items: center;

    &-image {
      width: 64px;
      margin-right: 8px;
    }
    &-tag {
      margin-left: auto;
    }
  }

  &__full {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__wrapper {
    width: 500px;
    position: relative;
  }
  &__info {
    background-color: #fff;
    padding: 8px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__name {
    font-size: 18px;
  }
  &__tag {
    max-width: 150px;
    margin-right: 16px !important;

    .v-input__control {
      min-height: unset !important;
      height: 36px !important;
    }
    .v-input__slot {
      height: 100% !important;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
  }
  &__download {
    color: #fff !important;
    background-color: rgb(70, 99, 163) !important;
  }
  &__right {
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translate(100%, -50%);
  }
  &__left {
    position: absolute;
    right: 100%;
    top: 50%;
    transform: translate(-100%, -50%);
  }
}
</style>
