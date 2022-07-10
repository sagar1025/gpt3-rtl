import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import  {Row, Container, Navbar, Form, Button} from 'react-bootstrap';


const Index = () => {
  const [hasResponse, setHasResponse] = useState('');
  const [componentCode, setComponentCode] = useState('');
  const [testcases, setTestCases] = useState([]);

  const getResponse = async() => {
    /* TO DO: USE the testCases state to be passed in to the API */
    const data = {
      model: "code-davinci-002",
      prompt: `#Write Unit Tests for each of the following Test Cases given a React Component.\nTest Cases: \nBoth credentials is incorrect.\nemail is correct, but password is incorrect.\nemail is incorrect, but password is correct.\n\nReact Component:\n${componentCode.trim()}\n\nUnit Tests:\n`,
      temperature: 0,
      max_tokens: 1500,
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
          <label className="mb-3"> Test Cases</label>
            <Form.Control as="textarea" style={{ height: '150px' }} type="text" onChange={(e)=> setTestCases(testcases =>[...testcases, e.target.value])}/>
            <label className="mb-3"> The Component</label>
            <Form.Control as="textarea" style={{ height: '500px' }} onChange={(e)=> setComponentCode(e.target.value)}/>
            <Button variant="primary" size="lg" type="submit" onClick={handleSubmit} className="mt-4">Submit</Button>
          </Form>
          {
            hasResponse && hasResponse !== '' 
            ?
            <div className="mt-5">
              <h4>The unit test cases</h4>
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
