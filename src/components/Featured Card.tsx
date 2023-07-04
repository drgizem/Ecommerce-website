import { Product } from "../types/types";
import {Card, Col,Row,Button} from 'react-bootstrap'
import { Link } from "react-router-dom";

type FeaturedCardProps = {
    product: Product;
    
};

const FeaturedCard = ({product}:FeaturedCardProps) => {

    return (   
      <Card className='featured-card'>
        <Row>
        <Col>
        <Card.Img className="featured-img" variant="top" src={product.image} />
        </Col>
        <Col>
        <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
                {product.price}$
            </Card.Text>
            <Link to = {`/products/${product.id}`}><Button variant="primary">Go to product</Button></Link>
        </Card.Body>    
        </Col>
        </Row>
        </Card>
    )
}

export default FeaturedCard
