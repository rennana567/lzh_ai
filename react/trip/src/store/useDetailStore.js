import {
    create
} from 'zustand'
import { getDetail } from '@/api/detail'
const useDetailStore = create((set) => ({
    detail:{
        title: '',
        desc: '',
        images: [
            {
                url: "http://dummyimage.com/300x200/f2c779/fff&text=图片",
                alt:''
            }
        ],
        price: ''
    },
    loading:false,
    setDetail:async()=>{
        set({loading:true})
        const res = await getDetail()
        set({
            loading:false,
            detail:res.data
        })
    }
}))

export default useDetailStore