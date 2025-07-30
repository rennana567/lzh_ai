import useTitle from '../../hooks/useTitle'
import SwiperDemo from '@/components/Swiper'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import {
    Button
} from 'react-vant'
import {
    showToast
} from '@/components/Toast/toastController'


const Home = () => {
    useTitle('travel 首页')
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    
    
    return (
        <div>
            <SwiperDemo />
            <Button type="primary" onClick={() => showToast(1, 2, 3)}>showToast</Button>
        </div>
    )
}

export default Home;