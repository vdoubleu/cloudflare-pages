import { Card } from "react-bootstrap";

function PostCard (props) {
  const id = props.id;
  const username = props.username;
  const content = props.content;
  const title = props.title;

  return (
    <Card className="my-2">
      <Card.Header>{title} - @{username} </Card.Header>
      <Card.Body>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
