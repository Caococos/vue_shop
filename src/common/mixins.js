/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: Zhihaot1
 * @Date: 2021-05-24 10:27:13
 * @LastEditors: Zhihaot1
 * @LastEditTime: 2021-05-24 10:38:48
 */
export const uploadImgMixin = {
  data() {
    return {
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      }
    }
  }
}
