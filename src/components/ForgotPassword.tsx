import { FormEvent, useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonBusyIndicator } from "./ButtonBusyIndicator";

export default function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    const authContext = useAuth();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string | null>();

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        try {
            setError(null);
            setLoading(true);

            const email = emailRef?.current?.value;

            if (email && authContext) {
                await authContext.resetPassword(email);
            }

            setMessage("Check your email for further instructions.");
        } catch (e: any) {
            console.log(e);

            if (e.hasOwnProperty("message")) {
                setError(e["message"]);
            } else {
                setError("Password reset error");
            }
        }

        setLoading(false);
    }

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Forgot Password</h2>
                    {message ? (
                        <Alert variant="success">{message}</Alert>
                    ) : (
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
                            <Button
                                className="w-100 mt-3"
                                type="submit"
                                disabled={loading}
                            >
                                <ButtonBusyIndicator busy={loading} />
                                Send Password Reset Email
                            </Button>
                        </Form>
                    )}
                </Card.Body>
                <div className="text-center m-2 w-100">
                    <Link to="/Login">Login</Link>
                </div>
            </Card>
        </>
    );
}
