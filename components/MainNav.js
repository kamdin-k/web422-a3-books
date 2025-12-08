// components/MainNav.js
import Link from "next/link";
import { useRouter } from "next/router";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useAtom } from "jotai";
import { userAtom, favouritesAtom, searchHistoryAtom } from "@/store";
import { removeToken, readToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [user, setUser] = useAtom(userAtom);
  const [, setFavourites] = useAtom(favouritesAtom);
  const [, setSearchHistory] = useAtom(searchHistoryAtom);

  const logout = () => {
    removeToken();
    setUser(null);
    setFavourites([]);
    setSearchHistory([]);
    router.push("/login");
  };

  const displayUserName =
    user?.userName || readToken()?.userName || "User";

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Container>
        <Link href="/" passHref legacyBehavior>
          <Navbar.Brand>Kamdin Kianpour</Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="me-auto">
            <Link href="/about" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/about"}>
                About
              </Nav.Link>
            </Link>
          </Nav>

          <Nav>
            {!user ? (
              <>
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"}>
                    Login
                  </Nav.Link>
                </Link>
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"}>
                    Register
                  </Nav.Link>
                </Link>
              </>
            ) : (
              <NavDropdown
                title={displayUserName}
                align="end"
                id="user-nav-dropdown"
              >
                <Link href="/favourites" passHref legacyBehavior>
                  <NavDropdown.Item>Favourites</NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>
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
