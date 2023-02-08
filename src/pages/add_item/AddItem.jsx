import { Form, Container, Button } from 'react-bootstrap'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';

export const AddItem = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [details, setDetails] = useState({
    title: "",
    content: "",
  })
  const [flag, setFlag] = useState(false);
  const onSubmit = (e) => {
    let temp = {};
    try {
      axios.post("http://localhost:3333/news", details).then((res) => {
        temp = res.data;
        setFlag(temp.success)
      });
    } catch (error) {
      console.log(error)
      return false
    }
    console.log("Success")
    return false

  };
  const detailsChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  }
  return (
    <Container className='mt-4'>
      <h1>Add Item</h1>
      <Form onSubmit={handleSubmit((e) => onSubmit(e))}>
        <Form.Group className="mb-3" >
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name='title' placeholder="Enter Title" value={details.title} {...register("title", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.title && <p style={{ color: "red" }}>Title is required</p>}
        <Form.Group className="mb-3" >
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" name='content' placeholder="Enter content" value={details.content} {...register("content", { required: true })} onChange={(e) => detailsChange(e)} />
        </Form.Group>
        {errors.content && <p style={{ color: "red" }}>content is required</p>}
        {flag ? (<h1 style={{ color: 'green' }} >Success</h1>) : (<></>)}
        <Button variant="success" type="submit"
        >
          Submit
        </Button>
        <Link to="/">
          <Button variant="primary" className='ms-2'>Back</Button>
        </Link>
      </Form>
    </Container>
  )
}
