import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom, favouritesAtom } from "@/store";
import { isAuthenticated, readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [, setFavourites] = useAtom(favouritesAtom);

  useEffect(() => {
    if (!user && isAuthenticated()) {
      const token = readToken();
      if (token && token.userName) {
        setUser(token.userName);
      }
    }
  }, [user, setUser]);

  const handleLogout = () => {
    removeToken();
    setUser(null);
    setFavourites([]);
    router.push("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Kamdin Kianpour</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link>About</Nav.Link>
            </Link>
          </Nav>
          <Nav>
            {!user && (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"}>Login</Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"}>Register</Nav.Link>
                </Link>
              </>
            )}
            {user && (
              <NavDropdown title={user} align="end">
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
