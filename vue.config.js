// vue.config.js file to be placed in the root of your repository

module.exports = {
  pwa: {
      workboxOptions: {
        exclude: [/_redirects/]
      }
    }
}