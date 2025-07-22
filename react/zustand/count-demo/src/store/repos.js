// 请求
import {
    getRepoList,
    getRepos
} from '../api/repo'
import {
    create
} from 'zustand'

export const useReposStore = create((set) => ({
    repos: [],
    loading: false,
    error: null,
    fetchRepos: async () => {
        // 业务
        set({loading: true,error: null});
        try {
            const repos = await getRepoList('rennana567')
            set({repos:repos.data, loading: false})
        }catch (error) {
            set({error: error.message, loading: false})
        }
    }
}))