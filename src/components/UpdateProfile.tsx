import { FormEvent, useEffect, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonBusyIndicator } from "./ButtonBusyIndicator";

export default function UpdateProfile() {
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const { updatePassword, updateEmail, currentUser } = useAuth();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>();
    const [password, setPassword] = useState<string | null>();
    const [passwordConfirm, setPasswordConfirm] = useState<string | null>();

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

        if (!e.currentTarget.checkValidity()) {
            return;
        }

        // Should just redirect out of here if we don't have a current user.
        if (!currentUser) {
            return;
        }

        const promises = [];

        if (email && email !== currentUser.email) {
            promises.push(updateEmail(email));
        }

        if (password) {
            promises.push(updatePassword(password));
        }

        Promise.all(promises)
            .then(() => {
                navigate("/");
            })
            .catch((e: any) => {
                if (e.hasOwnProperty("message")) {
                    setError(e["message"]);
                } else {
                    setError("Update error");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    <Form onSubmit={handleSubmit} noValidate validated={true}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
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
                                placeholder="Leave blank to keep password the same"
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Again</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Leave blank to keep password the same"
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
                            Update
                        </Button>
                    </Form>
                </Card.Body>
                <div className="text-center m-2 w-100">
                    <Link to="/">Cancel</Link>
                </div>
            </Card>
        </>
    );
}
