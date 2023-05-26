import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { useEffect,useState } from 'react';
import { Product } from '../types/types';
import { getProductByCategory } from '../firebase/ref';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Swipe = () => {
    const [products, setProducts] = useState<Product[]>([]);
   
    //get products from firebase
    useEffect(() => {
        getProductByCategory('2','TV').then((products) => {
            let temp:Product[] = []
            temp.push(...products)
            setProducts(temp)
        })
         
        }, [])
    
// add go to product page on click
    return (
       <Swiper
        modules={[Navigation, A11y]}
        navigation
        spaceBetween={50}
        slidesPerView={3}
       >
      {products&&products.map((product,index) => {
            return (
               
            <SwiperSlide key={index} >
                <Link to={`/${product.title}`}>
                    <img
                        className=" mb-3 swipe-image"
                        src={product.image}
                        alt="First slide"
                    />
                    <p>{product.title}</p>
                    <p>{product.description}</p>
                </Link>
            </SwiperSlide>
            )
                
        })
      }
    </Swiper>

    )
}

export default Swipe