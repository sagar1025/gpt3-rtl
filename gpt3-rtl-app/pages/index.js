import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import  {Row, Container, Navbar, Form, Button} from 'react-bootstrap';


const Index = () => {
  const [hasResponse, setHasResponse] = useState('');
  const [componentCode, setComponentCode] = useState('');

  const getResponse = async() => {
    const data = {
      model: "code-davinci-002",
      prompt: `#Write Unit Tests for each of the following Test Cases given a React Component.\nTest Cases: \nBoth credentials is incorrect.\nemail is correct, but password is incorrect.\nemail is incorrect, but password is correct.\n\nReact Component:\n${componentCode}\n\nUnit Tests:\n`,
      temperature: 0,
      max_tokens: 2500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    
    const response = await fetch('https://api.openai.com/v1/completions',{
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    });

    return response;
  }

  const handleSubmit = (e) => {
    e && e.preventDefault();
    const resp = getResponse()
    .then((resp) => resp.json())
    .then((data) => {
      setHasResponse(data.choices[0].text)
    });
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
            hasResponse && hasResponse !== '' 
            ?
            <div className="mt-5">
              <pre>
                {hasResponse}
              </pre>
            </div>
            :
            null
          }
        </Container>
      </Row>
    </Container>
  )
}

export default Index
