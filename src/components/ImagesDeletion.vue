<template>
  <div class="card">
    <div class="header">
      <h4 class="title">Удаление изображения</h4>
    </div>

    <draggable class="deletion" :list="list" group="images" draggable=".drag-item" @change="log">
      <template #footer>
        <span class="deletion__text">
          <v-icon class="deletion__text deletion__icon">mdi-trash-can-outline</v-icon>
        </span>
        <span v-if="!deleted" class="deletion__text">Перетащите сюда файл для удаления</span>
        <span v-else class="deletion__text">Файл {{ file.name }} удален</span>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import client from '@/http/client'

export default {
  name: 'ImagesDeletion',
  components: { draggable },
  data() {
    return {
      deleted: false,
      file: {},
      list: []
    }
  },
  methods: {
    log(evt) {
      client.delete('/images-deletion', { data: { image: evt.added.element.name } })
    }
  }
}
</script>

<style lang="scss">
.deletion {
  height: 250px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  .drag-item {
    z-index: 10;
  }

  &__icon {
    font-size: 7em !important;
    color: white !important;
    background-color: #f1f1f1;
    border-radius: 50%;
    padding: 24px;
  }

  &__text {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #888;
    text-align: center;
  }
}
</style>
