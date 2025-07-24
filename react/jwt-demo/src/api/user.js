import axios from './config'

export const getUser = () => {
    return axios.get('/api/user');
}

export const doLogin = (data) => {
    return axios.post('/api/login', data);
}

// export const getUserArticles = () => {
//     return axios.get('/user');
// }