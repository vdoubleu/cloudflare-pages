import { Card, Dropdown, DropdownButton, Container } from "react-bootstrap";

function PostCard (props) {
  const id = props.id;
  const username = props.username;
  const content = props.content;
  const title = props.title;
  const deletePost = props.deletePost;
  const currentUser = props.currentUser;

  function handleDeletePost(e) {
    deletePost(id);
  }

  const headWithDropdown = (
        <Dropdown > {title} - @{username} 
          <Dropdown.Toggle variant="light" className="py-0" />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDeletePost}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> 
  );

  const headWithoutDropdown = (<> {title} - @{username} </>);

  return (
    <Card className="my-2">
      <Card.Header> 
        {currentUser === username ? headWithDropdown : headWithoutDropdown}
      </Card.Header>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
