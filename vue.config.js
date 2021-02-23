module.exports = {
  lintOnSave: true,

  devServer: {
    open: true,
    watchOptions: {
      poll: true
    },
    // Configure proxy, more: https://github.com/chimurai/http-proxy-middleware#http-proxy-options
    proxy: 'http://localhost:3000/'
  },

  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/scss/vars";'
      }
    }
  },

  transpileDependencies: ['vuetify']
}
