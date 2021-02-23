<template>
  <div class="wrapper">
    <div class="dashboard">
      <images-list v-if="imagesListActive" />
      <images-filter v-if="imagesFilterActive" />
      <download-from-web v-if="downloadFromWebActive" />
      <download-from-user v-if="downloadFromUserActive" />
      <images-deletion v-if="imageDeletionActive" />
    </div>
  </div>
</template>

<script>
import ImagesList from '@/components/ImagesList.vue'
import ImagesFilter from '@/components/ImagesFilter.vue'
import DownloadFromUser from '@/components/DownloadFromUser.vue'
import DownloadFromWeb from '@/components/DownloadFromWeb.vue'
import ImagesDeletion from '@/components/ImagesDeletion.vue'

export default {
  name: 'Dashboard',
  components: { ImagesList, ImagesFilter, DownloadFromUser, DownloadFromWeb, ImagesDeletion },
  computed: {
    userPlugins() {
      return this.$store.state.account.model.plugins
    },
    imagesListActive() {
      return this.userPlugins.includes('images-list')
    },
    imagesFilterActive() {
      return this.userPlugins.includes('image-filters')
    },
    downloadFromWebActive() {
      return this.userPlugins.includes('download-images-from-web')
    },
    downloadFromUserActive() {
      return this.userPlugins.includes('download-image-from-user')
    },
    imageDeletionActive() {
      return this.userPlugins.includes('images-deletion')
    }
  }
}
</script>

<style lang="scss">
.card {
  border: 1px solid rgb(63, 148, 182);
  border-radius: 12px;
  padding: 8px 12px;
}
.wrapper {
  max-width: 1280px;
  height: 100%;
  margin: 0 auto;
  padding: 32px 0;
}
.dashboard {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;

  height: 100%;
}
</style>
