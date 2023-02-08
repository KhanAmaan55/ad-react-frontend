import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const ListView = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchApiData();

  }, []);
  const fetchApiData = async () => {
    try {
      axios.get("http://localhost:3333/news/").then((res) => {
        setPosts(res.data);
        // console.log(posts)
      });

    } catch (error) {
      console.log(error);
    }
  };
  const handleDetete = async (slug) => {
    try {
      await fetch(`http://localhost:3333/news/${slug}/delete`,{ method: 'DELETE' }).then((res) => {
        return res.json();
      });
    } catch (error) {
      console.log(error);
    }
    fetchApiData();
  };

  // console.log('post', posts);
  return (
    <>
      <Container className='mt-4'>
        <h1>View List</h1>
        <Link to="/add-student">
          <Button variant="primary" className='mb-3'>Add Item</Button>
        </Link>
        <Table responsive striped bordered hover size="sm">
          <thead >
            <tr>
              <th>Sr no.</th>
              <th>Title</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{val.title}</td>
                  <td>{val.content}</td>
                  <td className='text-center'>
                    <Link to={`/edit-student/${val.slug}`}>
                      <button className="btn btn-primary" style={{ width: '100%' }}>Edit</button>
                    </Link>
                  </td>
                  <td className='me-0'>
                    <button className="btn btn-danger" style={{ width: '100%' }}
                      onClick={() => handleDetete(val.slug)}
                    > Delete</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Container>
    </>
  )
}
export default ListView;
