<template>
    <div class="login-container">
        <h2>登录</h2>
        <form @submit.prevent="handleLogin">
            <input type="text" placeholder="用户名" required v-model="username" />
            <input type="password" placeholder="密码" required v-model="password" />
            <button type="submit">登录</button>
        </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/user'
import { login } from '@/api/login'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const userStore = useStore()
const router = useRouter()

const handleLogin = async () => {
    try {
        const responseData = await login({
            username: username.value,
            password: password.value
        })
        console.log(responseData)
        userStore.setToken(responseData.token)
        userStore.setUsername(responseData.username)
        router.push('/')

    }catch(err){
        console.error(err)
    }
}
</script>