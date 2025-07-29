
import { Swiper,} from 'react-vant';

export const SwiperDemo = () => {
    const imgArr = [
    '/images/oldsummer.png',
    '/images/wall.png',
    '/images/beihai.png'
  ];
    const items = imgArr.map((i) => (
    <Swiper.Item key={i}>
      <img src={i} alt="" />
    </Swiper.Item>
  ));
  return (
    <div className="demo-swiper">
      <Swiper autoplay={5000} slideSize={80} trackOffset={10}>
        {items}
      </Swiper>
    </div>
  );
};

export default SwiperDemo;