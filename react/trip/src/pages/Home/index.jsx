import useTitle from '../../hooks/useTitle'
import SwiperDemo from '@/components/Swiper'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './home.module.css';



const Home = () => {
    useTitle('travel 首页')
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    
    
    return (
        <div>
            <SwiperDemo />
            home
        </div>
    )
}

export default Home;