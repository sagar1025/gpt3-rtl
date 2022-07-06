import 'bootstrap/dist/css/bootstrap.css'
import  {Row, Container, Navbar, FloatingLabel, Form} from 'react-bootstrap';

function Index() {
  return (
    <Container fluid>
      <Row>
        <Navbar bg="dark" expand="lg" variant="dark">
          <Container>
            <Navbar.Brand href="#">Home</Navbar.Brand>
          </Container>
        </Navbar>
      </Row>
      <Row className="mt-4 mx-5">
        <Container>
          <Form>
            <FloatingLabel
                  controlId="componentArea"
                  label="The Component"
                  className="mb-3">
                <Form.Control as="textarea" style={{ height: '500px' }}/>
            </FloatingLabel>
          </Form>
        </Container>
      </Row>
    </Container>
  )
}

export default Index
