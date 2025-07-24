import axios from './config'

// todos接口
export const getTodos = () => {
    return axios.get('http://localhost:5173/api/todos')
}

export const getRepos = () => {
    return axios.get('/repos')
}