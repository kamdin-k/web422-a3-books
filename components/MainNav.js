import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap";
import { userAtom } from "@/store";
import { isAuthenticated, readToken, removeToken } from "@/lib/authenticate";

export default function MainNav() {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useAtom(userAtom);

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchValue.trim()) return;
    const queryString = new URLSearchParams({ title: searchValue.trim() });
    setSearchValue("");
    router.push(`/books?${queryString.toString()}`);
  }

  function logout() {
    removeToken();
    setUser(null);
    router.push("/login");
  }

  useEffect(() => {
    if (isAuthenticated()) {
      const token = readToken();
      setUser({ userName: token.userName });
    } else {
      setUser(null);
    }
  }, [router.asPath, setUser]);

  return (
    <Navbar bg="dark" variant="dark" className="fixed-top">
      <Link href="/" passHref legacyBehavior>
        <Navbar.Brand className="ms-3">Kamdin Kianpour</Navbar.Brand>
      </Link>
      <Nav className="me-auto">
        <Link href="/about" passHref legacyBehavior>
          <Nav.Link>About</Nav.Link>
        </Link>
      </Nav>
      <Form className="d-flex me-3" onSubmit={handleSubmit}>
        <FormControl
          type="search"
          placeholder="Search by title"
          className="me-2"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </Form>
      <Nav className="me-3">
        {user ? (
          <NavDropdown title={user.userName} id="user-dropdown" align="end">
            <Link href="/favourites" passHref legacyBehavior>
              <NavDropdown.Item>Favourites</NavDropdown.Item>
            </Link>
            <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
          </NavDropdown>
        ) : (
          <>
            <Link href="/login" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/login"}>Login</Nav.Link>
            </Link>
            <Link href="/register" passHref legacyBehavior>
              <Nav.Link active={router.pathname === "/register"}>Register</Nav.Link>
            </Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
}
