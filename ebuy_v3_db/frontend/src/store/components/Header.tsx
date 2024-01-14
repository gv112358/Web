import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { accessActions } from "../util/accessSlice";

function Header() {
  const username: string = useSelector((state: any) => state.access.username);

  const dispatch = useDispatch();

  const disconnectHandler = () => {
    dispatch(accessActions.disconnect());
  };

  return (
    <Navbar
      className="bg-body-tertiary"
      style={{ borderBottom: "1px solid #E0E0E0" }}
    >
      <Container fluid style={{ paddingLeft: 0 }}>
        <Navbar.Brand href="#home">
          <span style={{ display: "flex", alignItems: "center" }}>
            <img src="https://pages.ebay.com/favicon.ico" alt="logo"></img>
            <h2 style={{ display: "inline" }}>eBuy</h2>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {username && (
            <Navbar.Text>
              <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={"Utente: " + username}
                >
                  <NavDropdown.Item onClick={disconnectHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
