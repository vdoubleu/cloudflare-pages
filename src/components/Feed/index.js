import { useState, useEffect } from 'react';
import PostCard from "./postCard";
import PostForm from "./postForm";
import { Toast, ToastContainer } from "react-bootstrap";
import "./feed.css";

function Feed() {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const makePost = async (postTitle, postContent) => {
    const postIdResp = await fetch('https://worker.vdoubleu.workers.dev/posts/id');
    const postIdJson = await postIdResp.json();

    const response = await fetch('https://worker.vdoubleu.workers.dev/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        username: 'vdoubleu',
        id: postIdJson.id,
      }),
    });

    if (response.status === 201) {
      await fetch('https://worker.vdoubleu.workers.dev/posts/id', {
        method: 'POST',
        body: JSON.stringify({
          id: postIdJson.id + 1,
        }),
      });


      await getData();
      setToastMessage("Post successfully created!");
      setShowToast(true);
    } else {
      setToastMessage("Error creating post!");
      setShowToast(true);
    }
  };

  const getData = async () => {
    const response = await fetch('https://worker.vdoubleu.workers.dev/posts');
    const json = await response.json();
    json.reverse();
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="feed">
      <div className="post-creator">
        <PostForm onPost={makePost} toastMessage={setToastMessage} showToast={setShowToast} />
      </div>
      <hr />
      <div className="scroller">
      {data.map(post => (
        <PostCard key={post.id} 
              id={post.id} 
              content={post.content} 
              title={post.title} 
              username={post.username} 
        />
      ))}
      </div>
      <ToastContainer position={"top-end"}>
      <Toast show={showToast} onClose={() => setShowToast(false)} delay={1500} autohide>
        <Toast.Header> {toastMessage}  </Toast.Header>
      </Toast>
      </ToastContainer>
    </div>
  );
}

export default Feed;
