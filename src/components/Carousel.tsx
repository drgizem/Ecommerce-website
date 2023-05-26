import { Carousel, Col,Row } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Product } from "../types/types"
import {getProducts} from '../firebase/ref'
import { Link } from "react-router-dom"


const ProductCarousel = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts('TV','Curved TVs').then((products) => {
            let temp:Product[] = []
            temp.push(products[0],products[1],products[2],products[3],products[4])
            setProducts(temp)
        })
    }, [])
    console.log(products)
    return (
        <Carousel>
            {products&&products.map((product,index) => {
                return (
                    <Carousel.Item key={index}>
                  <Link to={`/${product.title}`}> 
                  <Row>
                  <Col>
                       <img
                            className="carousel-image"
                            src={product.image}
                            alt="First slide"
                        />
                       </Col>
                     <Col>
                     <Carousel.Caption>
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                        </Carousel.Caption>
                        </Col>
                  </Row>
                    </Link>
                    </Carousel.Item>
                )
            })}
    
        </Carousel>
    )
}

export default ProductCarousel
