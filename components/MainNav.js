import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAtom } from "jotai";
import { userAtom, favouritesAtom } from "@/store";
import { isAuthenticated, readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [, setFavouritesList] = useAtom(favouritesAtom);

  const [loggedIn, setLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const logged = isAuthenticated();
    setLoggedIn(logged);

    if (logged) {
      const tokenData = readToken();
      const name = tokenData?.userName || user?.userName || "User";
      setDisplayName(name);
      if (!user || user.userName !== name) {
        setUser({ userName: name });
      }
    } else {
      setDisplayName("");
    }
  }, [setUser, user]);

  function handleLogout() {
    removeToken();
    setUser(null);
    setFavouritesList([]);
    setLoggedIn(false);
    setDisplayName("");
    router.push("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} href="/">
          Kamdin Kianpour
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar-nav" />

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto">
            {!loggedIn && (
              <>
                <Nav.Link as={Link} href="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} href="/register">
                  Register
                </Nav.Link>
              </>
            )}

            {loggedIn && (
              <NavDropdown
                align="end"
                title={displayName}
                id="user-nav-dropdown"
              >
                <NavDropdown.Item as={Link} href="/favourites">
                  Favourites
                </NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
