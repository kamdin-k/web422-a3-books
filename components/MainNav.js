import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { userAtom } from "@/store";
import { isAuthenticated, readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    if (isAuthenticated()) {
      const token = readToken();
      setUser({ userName: token.userName });
    } else {
      setUser(null);
    }
  }, [router.pathname, setUser]);

  function logout() {
    removeToken();
    setUser(null);
    router.push("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="navbar-dark bg-dark">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Kamdin Kianpour
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {!user && (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link>Login</Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link>Register</Nav.Link>
                </Link>
              </>
            )}
            {user && (
              <NavDropdown title={user.userName} align="end">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
