import { useState, useEffect } from "react";
import PostCard from "./postCard";
import PostForm from "./postForm";
import { Toast, ToastContainer, Container } from "react-bootstrap";
import "./feed.css";

function Feed(props) {
  const [data, setData] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastBg, setToastBg] = useState("light");

  const workerUrlBase = process.env.WORKER_URL_BASE;
  console.log(process.env);
  console.log(workerUrlBase);

  const makePost = async (postTitle, postContent) => {
    const postIdResp = await fetch(
      workerUrlBase + "/posts/id/available"
    );
    const postIdJson = await postIdResp.json();

    const response = await fetch(workerUrlBase + "/posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: postTitle,
        content: postContent,
        username: props.username,
        id: postIdJson.id,
      }),
    });

    if (response.status === 201) {
      await fetch(workerUrlBase + "/posts/id/available", {
        method: "POST",
        body: JSON.stringify({
          id: postIdJson.id + 1,
        }),
      });

      await getData();
      setToastMessage("Post successfully created!");
      setShowToast(true);
    } else if (response.status === 401) {
      setToastMessage("You are not authorized to post with the current account, perhaps your session timed out? Please log in with another username");
      setToastBg("danger");
      setShowToast(true);
    } else {
      setToastMessage("Error creating post!");
      setToastBg("danger");
      setShowToast(true);
    }
  };

  const deletePost = async (postId) => {
    const response = await fetch(
      workerUrlBase + "/posts/" + postId,
      {
        method: "DELETE",
      }
    );

    if (response.status === 200) {
      await getData();
      setToastMessage("Post successfully deleted!");
      setShowToast(true);
    } else {
      setToastMessage("Error deleting post!");
      setToastBg("danger");
      setShowToast(true);
    }
  };

  const getData = async () => {
    const response = await fetch(workerUrlBase + "/posts", {
      method: "GET",
      headers: {
        "pragma": "no-cache",
        "Cache-Control": "no-cache",
      }
    });
    const json = await response.json();
    console.log(json);
    json.reverse();
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      <div className="feed">
        <div className="post-creator">
          <PostForm
            onPost={makePost}
            toastMessage={setToastMessage}
            showToast={setShowToast}
          />
        </div>
        <hr />
        <div className="scroller">
          {data.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              content={post.content}
              title={post.title}
              username={post.username}
              deletePost={deletePost}
              currentUser={props.username}
            />
          ))}
        </div>

        <ToastContainer position={"top-end"} bg={toastBg}>
          <Toast
            show={showToast}
            onClose={() => { setShowToast(false); setToastBg("light"); }}
            delay={1500}
            autohide
          >
            <Toast.Header> {toastMessage} </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>
    </Container>
  );
}

export default Feed;
