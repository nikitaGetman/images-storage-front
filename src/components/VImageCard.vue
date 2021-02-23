<template>
  <div class="image-card" @click="openFullView">
    <img :src="src" alt="image" />

    <div v-if="fullView" class="image-card__full" @click.stop="fullView = false">
      <div class="image-card__wrapper" @click.stop>
        <v-img :src="src" :lazy-src="src" class="grey lighten-2">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>

        <v-btn elevation="1" icon class="image-card__download" @click.stop="download"
          ><v-icon>mdi-download</v-icon></v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VImageCard',
  props: {
    image: { type: String, required: true }
  },
  data() {
    return {
      fullView: false
    }
  },
  computed: {
    id() {
      return this.$store.state.account.model.id
    },
    src() {
      return `http://localhost:3000/images/${this.id}/${this.image}`
    }
  },
  methods: {
    openFullView() {
      this.fullView = true
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
    max-width: 500px;
    position: relative;
  }
  &__download {
    position: absolute;
    right: 16px;
    bottom: 16px;
    color: #fff !important;
    background-color: rgb(110, 110, 110);
  }
}
</style>
