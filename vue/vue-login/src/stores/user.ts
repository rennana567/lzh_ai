import {
    defineStore
} from 'pinia'

export const useStore = defineStore('user',{
    state:() => ({
        token: localStorage.getItem('token') || '',
        username: localStorage.getItem('username') || ''
    }),
    actions: {
        setToken(token: string){
            this.token = token
            localStorage.setItem('token',token)
        },
        setUsername(username: string){
            this.username = username
            localStorage.setItem('username',username)
        },
        logout(){
            this.token = ''
            this.username = ''
            localStorage.removeItem('token')
            localStorage.removeItem('username')
        }
    },
    // 计算属性  本身是依赖于响应式状态计算后的结果
    // react 中使用 useMemo 缓存 
    getters: {
        isLogin():boolean{
            return !!this.token // !! 转换成布尔值
        }
    }
})