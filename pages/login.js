import { useState } from "react";
import { useRouter } from "next/router";
import { authenticateUser } from "@/lib/authenticate";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

export default function Login() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning("");

    try {
      await authenticateUser(userName, password);
      router.push("/books");
    } catch (err) {
      setWarning(err.message);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <h2>Login</h2>
          {warning && <Alert variant="danger">{warning}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit">Login</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
