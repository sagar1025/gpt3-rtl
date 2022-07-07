import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import  {Row, Container, Navbar, FloatingLabel, Form, Button, Label} from 'react-bootstrap';
const { Configuration, OpenAIApi } = require("openai");

const Index = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const [hasResponse, setHasResponse] = useState('');
  const [componentCode, setComponentCode] = useState('');

  const getResponse = async() => {
    const response = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: `#Write Unit Tests for each of the following Test Cases given a React Component.\nTest Cases: \nBoth credentials is incorrect.\nemail is correct, but password is incorrect.\nemail is incorrect, but password is correct.\n\nReact Component:\n${componentCode}\n\nUnit Tests:\n`,
      temperature: 0,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,    
      },
      {
        headers: {
          "Authorization": `Bearer ${openai.apiKey}`,
        },
      }
    );
console.log(response);
    return response;
  }

  const handleSubmit = (e) => {
    e && e.preventDefault();
    const resp = getResponse();
    setHasResponse(resp);
  }

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
            <label className="mb-3"> The Component Code</label>
            <Form.Control as="textarea" style={{ height: '500px' }} onChange={(e)=> setComponentCode(e.target.value)}/>
            <Button variant="primary" size="lg" type="submit" onClick={handleSubmit}>Submit</Button>
          </Form>
          {
            hasResponse && hasResponse !== '' ?
            <pre>
              {hasResponse}
            </pre>
            :
            null
          }
        </Container>
      </Row>
    </Container>
  )
}

export default Index
