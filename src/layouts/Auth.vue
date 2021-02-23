<template>
  <div class="auth-layout">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'AuthLayout'
}
</script>

<style lang="scss">
.auth-layout {
  max-width: 800px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
