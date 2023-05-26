
import Footer from './Footer';
import ProductCarousel from './Carousel';
import Swipe from './Swipe';
import Featured from './Featured';

//<Featured />

const Home = () => {
    return (
        <div>
            <ProductCarousel />
            <Swipe />
            
            <Footer />
        </div>
    )
}

export default Home