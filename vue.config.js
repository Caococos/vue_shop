/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-20 20:58:05
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-06-19 16:45:45
 */
module.exports = {
  publicPath: "./",
  assetsDir: "static",
  outputDir: 'dist',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },
  chainWebpack: config => {
    //发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add(('./src/main-prod.js'))
    })
    // config.set('externals', {
    //   'vue': 'Vue',
    //   'vue-router': 'VueRouter',
    //   'axios': 'axios',
    //   'lodash': '_',
    //   'echarts': 'echarts',
    //   'nprogress': 'NProgress',
    //   'vue-quill-editor': 'VueQuillEditor'
    // })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
    })
  }
}