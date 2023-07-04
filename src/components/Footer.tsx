import { Row,Col } from "react-bootstrap";

const Footer = () => {
    const instagram = require('../components/Img/Logos/instagram.png');
    const facebook = require('../components/Img/Logos/facebook.png');
    const twitter = require('../components/Img/Logos/twitter.png');

    return (
      <div  className="footer">
        <Row className="footer-links">
            <Col xs={4} s={3} md={2} className="p-0 footer-shop">
                
                <ul>
                    <li><h6>Shop</h6></li>
                    <li><a href="/shop">Shop All</a></li>
                    <li><a href="/shop">Featured</a></li>
                    <li><a href="/shop">Best Sellers</a></li>
                </ul>
            </Col>
            <Col xs={4} s={3}  md={2} className="p-0 footer-help">
                
                <ul>
                    <li><h6>Help</h6></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/faq">FAQ</a></li>
                </ul>
            </Col>
            <Col xs={4}  s={3} md={2} className="p-0 footer-about">
                
                <ul>
                    <li><h6>About</h6></li>
                    <li><a href="/about">About Us</a></li>
                    <li><a href="/about">Our Story</a></li>
                    <li><a href="/about">Careers</a></li>
                </ul>
            </Col>
            <Col xs={4}  sm={3} md={2} className="p-0 footer-social">
                <Row className="social-cont"  >
                    <Col xs={3} sm={2} className="p-0 instagram">
                        <a className="social" href="https://www.instagram.com/"><img src={instagram} alt="instagram"/></a>
                        </Col>
                    <Col xs={3} sm={2} className="p-0 facebook">
                        <a className="social" href="https://www.facebook.com/"><img src={facebook} alt="facebook"/></a>
                        </Col>
                    <Col xs={3} sm={2} className="p-0 twitter">
                        <a className="social" href="https://twitter.com/"><img src={twitter} alt="twitter"/></a>
                        </Col>
                </Row>
            </Col>
        </Row>
        <Row className=" mt-2 footer-text">
            <Col md={3} className='copyright'>
                <p>© 2023, All rights reserved</p>
            </Col>
            <Col md={4} className='terms-privacy'>
            <Row>
            <Col md={5} className='privacy'>
                <p>Privacy Policy</p>
            </Col>
            <Col md={5} className='terms'>
                <p>Terms of Service</p>
            </Col>
            </Row>
            </Col>
           
        </Row>
      </div>
    )
}

export default Footer
