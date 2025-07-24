import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:5173'

axios.interceptors.request.use(config => {
    console.log('请求开始')
    let token = localStorage.getItem('token') || ''
    config.headers.Authorization =` Bearer ${token}`
    return config
})

axios.interceptors.response.use(res => {
    console.log('响应开始')
    return res
})

export default axios