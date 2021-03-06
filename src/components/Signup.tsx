import { FormEvent, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonBusyIndicator } from "./ButtonBusyIndicator";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>();
    const { signup } = useAuth();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (
            password &&
            password.length &&
            (!passwordConfirm || password.localeCompare(passwordConfirm))
        ) {
            passwordConfirmRef?.current?.setCustomValidity(
                "Passwords must match"
            );
        } else {
            passwordConfirmRef?.current?.setCustomValidity("");
        }
    }, [password, passwordConfirm]);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setValidated(true);

        if (!e.currentTarget.checkValidity()) {
            return;
        }

        try {
            setError(null);
            setLoading(true);

            await signup(email, password);
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <Form
                        onSubmit={handleSubmit}
                        noValidate
                        validated={validated}
                    >
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Must be a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Again</Form.Label>
                            <Form.Control
                                type="password"
                                required
                                ref={passwordConfirmRef}
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            ></Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Passwords must match
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button
                            className="w-100 mt-3"
                            type="submit"
                            disabled={loading}
                        >
                            <ButtonBusyIndicator busy={loading} />
                            Sign Up
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="text-center mt-2 w-100">
                Already have an account? <Link to="/Login">Log In</Link>
            </div>
        </>
    );
}
