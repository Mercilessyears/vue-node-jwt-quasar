import axios from 'axios'
import qs from 'qs'
import { Notify } from 'quasar'

const fetch = axios.create({
  baseURL: process.env.API,
  timeout: 6000
})

fetch.interceptors.request.use(
  config => {
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    const token = sessionStorage.getItem('TOKEN') || null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    Notify.create({ message: '请求超时' })
    return Promise.reject(error)
  }
)

fetch.interceptors.response.use(
  response => {
    let data
    if (response.data === undefined) {
      data = response.request.responseText
      return data.data
    } else if (response.status === 200) {
      data = response
      const token = response.headers.authorization || null
      console.log(response)
      if (token) {
        sessionStorage.setItem('TOKEN', token)
      }
      return data
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          location.href = '/login'
          // this.$router.replace('/login')
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    Notify.create({ message: err.message + '拦截器' })
    return Promise.reject(err)
  }
)

export default fetch
