/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-20 20:58:05
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-06-18 21:30:47
 */
//这是项目发布阶段需要用到的babel插件
const prodPlugins = []
if (process.env.NODE_ENV === 'production') {
  //移除console输出内容
  prodPlugins.push('transform-remove-console')
}


module.exports = {
  "presets": ['@vue/cli-plugin-babel/preset'],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins
  ]
}