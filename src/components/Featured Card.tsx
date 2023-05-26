import { Product } from "../types/types";
import {Card, Col,Row,Button} from 'react-bootstrap'

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
                {product.price}
            </Card.Text>
            <Button> Go to product</Button>
        </Card.Body>    
        </Col>
        </Row>
        </Card>
    )
}

export default FeaturedCard
