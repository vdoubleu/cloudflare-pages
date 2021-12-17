import { useState, useEffect } from 'react';
import { Card, Dropdown } from "react-bootstrap";

function PostCard (props) {
  const id = props.id;
  const username = props.username;
  const content = props.content;
  const title = props.title;
  const deletePost = props.deletePost;
  const currentUser = props.currentUser;
  const [postContent, setPostContent] = useState(content);

  function handleDeletePost() {
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

  useEffect(() => {
    // placing this here so that this code is never run after the first render (none of the props should ever change)
    // and increases performance
    function replaceImageUrlWithImgTag(inputStr) {
      const str = inputStr + " "; // adding a whitespace at the end to make sure we don't miss the last image
      const urlRegex = /(https?:\/\/[^\s]+\.(?:png|jpg|jpeg|gif)(\?([a-zA-Z0-9_]*=[a-zA-Z0-9_]*)(\&[a-zA-Z0-9_]*=[a-zA-Z0-9_]*)*)?\s)/g;
      const allMatches = [...str.matchAll(urlRegex)];
      if (allMatches.length === 0) {
        return str;
      }

      const allIndexes = allMatches.map(match => match.index);
      const allMatchText = allMatches.map(match => match[0]);
      const allMatchTextLength = allMatchText.map(text => text.length);

      let blocks = [];
      let currInd = 0;
      allIndexes.forEach((ind, i) => {
        blocks.push(str.substring(currInd, ind));
        blocks.push(<img className="post-embedded-image" key={i} src={allMatchText[i]} />);
        currInd = ind + allMatchTextLength[i];
      });

      blocks.push(str.substring(currInd));

      return blocks;
    }

    setPostContent(replaceImageUrlWithImgTag(content));
  }, []);


  return (
    <Card className="my-2">
      <Card.Header> 
        {currentUser === username ? headWithDropdown : headWithoutDropdown}
      </Card.Header>
      <Card.Body>
        <Card.Text>{postContent} </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default PostCard;
