import { Navbar, Container } from "react-bootstrap";

function InfoNav(props) {
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand href="/feed">CFBook</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="/">{props.username}</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InfoNav;
