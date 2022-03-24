const { defineConfig } = require('@vue/cli-service')
const {resolve} = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  publicPath: "./",
  outputDir: 'dist',
  assetsDir: 'static',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/index.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@as', resolve('src/assets'))
      .set('@cp', resolve('src/components'))
      .set('@service', resolve('src/service'))
    config.module.rules.delete('eslint');
  },
  devServer: {
    open:true,
    proxy: {
      '/api': {
        target: 'http://192.168.110.66:8089',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})
