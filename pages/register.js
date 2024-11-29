import { Card, Form, Alert, Button } from "react-bootstrap";
import { useState } from "react";
import { registerUser } from "@/lib/authenticate";
import { useRouter } from "next/router";

export default function Register() {
    const [warning, setWarning] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const router = useRouter();

    // Handle form submission
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(user, password, password2); // Register user
            router.push("/login"); // Redirect to login page
        } catch (err) {
            setWarning(err.message); // Show error message
        }
    }

    return (
        <>
            <Card bg="light">
                <Card.Body>
                    <h2>Register</h2>
                    <p>Register for an account:</p>
                </Card.Body>
            </Card>

            <br />

            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>User:</Form.Label>
                    <Form.Control
                        type="text"
                        value={user}
                        id="userName"
                        name="userName"
                        placeholder="Enter your username"
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <br />
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password2}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Re-enter your password"
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                </Form.Group>

                {warning && (
                    <>
                        <br />
                        <Alert variant="danger">{warning}</Alert>
                    </>
                )}

                <br />
                <Button variant="primary" className="pull-right" type="submit">
                    Register
                </Button>
            </Form>
        </>
    );
}
