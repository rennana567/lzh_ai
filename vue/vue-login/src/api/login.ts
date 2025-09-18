import request from './request'

export const login = (data: {username: string, password: string} ) => {
    return request.post('/login', data) as Promise<{token: string; username: string}>
}