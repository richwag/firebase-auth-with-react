import { FormEvent, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonBusyIndicator } from "./ButtonBusyIndicator";

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const authContext = useAuth();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setError(null);
            setLoading(true);

            const email = emailRef?.current?.value;
            const password = passwordRef.current?.value;

            if (email && password && authContext) {
                await authContext.login(email, password);
            }
            navigate("/");
        } catch (e: any) {
            console.log(e);

            if (e.hasOwnProperty("message")) {
                setError(e["message"]);
            } else {
                setError("Signin error");
            }
        }

        setLoading(false);
    }

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                ref={emailRef}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                ref={passwordRef}
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Button
                            className="w-100 mt-3"
                            type="submit"
                            disabled={loading}
                        >
                            <ButtonBusyIndicator busy={loading} />
                            Log In
                        </Button>
                    </Form>
                </Card.Body>
                <div className="text-center m-2 w-100">
                    <Link to="/ForgotPassword">Forgot Password?</Link>
                </div>
            </Card>
            <div className="text-center mt-2 w-100">
                Need an account? <Link to="/Signup">Sign Up</Link>
            </div>
        </>
    );
}
