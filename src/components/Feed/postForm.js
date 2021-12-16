import { useState } from 'react';
import { Form, FloatingLabel, Button } from 'react-bootstrap';

function PostForm(props) {
  const [titleInput, setTitleInput] = useState('');
  const [contentInput, setContentInput] = useState('');

  function handleMakePost(e) {
    e.preventDefault();
    if (titleInput && contentInput) {
      props.onPost(titleInput, contentInput);
      setTitleInput('');
      setContentInput('');
    } else {
      props.toastMessage('Please fill out all fields');
      props.showToast(true);
    }
  }

  return (
    <Form onSubmit={handleMakePost}>
      <Form.Group className="mb-3">
        <FloatingLabel label="Title">
          <Form.Control type="text" placeholder="Title" value={titleInput} onChange={e => setTitleInput(e.target.value)} />
        </FloatingLabel>  
      </Form.Group>
      <Form.Group className="mb-3">
        <FloatingLabel label="Input your post here">
          <Form.Control as="textarea" placeholder="Input your post here" value={contentInput} style={{ height: '70px' }} onChange={e => setContentInput(e.target.value)} />  
        </FloatingLabel>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default PostForm;
