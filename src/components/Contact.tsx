import { Container, Row, Col,Form,Button } from "react-bootstrap"
import { useState } from "react"

type Input = {
    name:string,
    email:string,
    message:string
}
const Contact = () => {
    const [input, setInput] = useState<Input>({
        name:'',
        email:'',
        message:''
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setInput({
            ...input,
            [e.target.name]:e.target.value
        })
    }
    //navbar to add
    return (
        <>
        <Container>
        <h1>
            Contact Us
        </h1>
        <Form>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Name</Form.Label>
                <Form.Control onChange={handleChange} name='name' type="text" placeholder="Name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={handleChange} name='email' type="email" placeholder="Email" />
            </Form.Group>
         </Col>
            <Col>   
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Message</Form.Label>
                <Form.Control onChange={handleChange} name='message' as="textarea" rows={4} />
            </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
            <Button variant="primary" type="submit">
                Submit
            </Button>  
            </Col>
          </Row>
        </Form>
        </Container>
      
      </>
        
    )
}

export default Contact