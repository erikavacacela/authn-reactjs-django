import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { login } from "../security/users";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { getUserIdFromDecodeToken } from "../utils/decode-token";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username: username, password: password };

    login(data).then((res) => {
      const user_id = getUserIdFromDecodeToken(res.data.access);

      if (res.status === 200) {
        if (
          signIn({
            auth: { token: res.data.access, type: "Bearer"},
            refresh: res.data.refresh,
            userState: { username: username, id: user_id, refreshToken: res.data.refresh},
          })
        ) {
          window.location.href = "/";
        } else {
          //Throw error
        }
      }
    });
  };
  return (
    <>
      <Container>
        <h1 className="text-center">Iniciar sesión</h1>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control name="username" type="username" placeholder="usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control name="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Iniciar sesión
          </Button>
        </Form>
      </Container>
    </>
  );
}
