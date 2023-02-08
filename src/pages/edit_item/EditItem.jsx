import { useParams, Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap'

export const EditItem = () => {

  let params = useParams();
  let temp = {};
  const [user, setUser] = useState({});
  const [flag, setFlag] = useState(false);


  const updateData = (e) => {
    setUser((prev) => { return { ...prev, [e.target.name]: e.target.value } });
  }
  useEffect(() => {
    axios.get(`http://localhost:3333/news/${params.slug}/edit`).then((res) => {
      setUser(res.data);
    });
  }, []);
  const formSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(`http://localhost:3333/news/${params.slug}`, user).then((res) => {
        temp = res.data;
        setFlag(temp.success)
        console.log(temp)
      });
    } catch (error) {
      console.log(error)
    }
    return false
  }
  return (
    <Container className='mt-4'>
      <h1>Edit Student</h1>
      <Form onSubmit={formSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name='title' defaultValue={user.title}
            onChange={updateData}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name='content' defaultValue={user.content}
            onChange={updateData}
          />
        </Form.Group>
        {flag ? (<h1 style={{ color: 'green' }} >Success</h1>) : (<></>)}
        <Button type='submit' variant="success">Submit</Button>
        <Link to="/">
          <Button variant="primary" className='ms-2'>Back</Button>
        </Link>
      </Form>
    </Container>
  )
}
