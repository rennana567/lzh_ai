
import { Swiper,} from 'react-vant';

export const SwiperDemo = () => {
    const imgArr = [
    'https://img2.baidu.com/it/u=1292242866,3685288605&fm=253&fmt=auto&app=120&f=JPEG?w=1422&h=800',
    'https://img2.baidu.com/it/u=425120068,2264698154&fm=253&fmt=auto&app=138&f=JPEG?w=888&h=500',
    'https://img0.baidu.com/it/u=1410782797,2149688659&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500'
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