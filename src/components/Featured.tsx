import { useEffect, useState } from 'react'
import { Product } from '../types/types'
import {getProducts} from '../firebase/ref'
import {Row} from 'react-bootstrap'
import FeaturedCard from './Featured Card'


const Featured = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        getProducts('TV','Curved TVs').then((products) => {
            let temp:Product[] = []
            temp.push(products[0],products[1],products[2],products[3],products[4])
            setProducts(temp)
        })
    }, [])
    return (
        <Row className='featured-cont'>
            {products&&products.map((item,index) => {
                return (
                    <FeaturedCard key={index} product={item} />
                )
            })}
        </Row>
    )
}

export default Featured