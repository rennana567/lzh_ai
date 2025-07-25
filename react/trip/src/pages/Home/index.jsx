import useTitle from '../../hooks/useTitle'
import SwiperDemo from '@/components/Swiper'

const Home = () => {
    useTitle('travel 首页')
  return (
    <div>
      <SwiperDemo />
      <h1>Home</h1>
    </div>
  )
}

export default Home;