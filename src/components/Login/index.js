import { useState } from "react";
import { Card, Form, FloatingLabel, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login(props) {
  const setUsername = props.setUsername;
  const [usernameInput, setUsernameInput] = useState("");
  let navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    setUsername(usernameInput);

    if (usernameInput !== "") {
      navigate("feed");
    }
  }

  return (
    <Container>
      <div className="login-position">
        <Card className="login-card">
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicUsername">
                <FloatingLabel label="Username">
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group className="button-pos">
                <Form.Control type="submit" value="Submit" />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default Login;
