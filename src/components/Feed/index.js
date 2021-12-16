import { useState, useEffect } from 'react';
import Card from "./card";

function Feed() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch('https://worker.vdoubleu.workers.dev/posts');
    console.log(response);
    const json = await response.json();
    console.log(json);
    setData(json);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="feed">
      {data.map(post => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
