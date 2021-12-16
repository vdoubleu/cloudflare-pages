function Card (props) {
  const id = props.id;
  const username = props.username;
  const content = props.content;
  const title = props.title;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
    </div>
  );
}

export default Card;
