import { FormEvent, useRef, useState } from "react";
import { Alert, Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ButtonBusyIndicator } from "./ButtonBusyIndicator";

export default function UpdateProfile() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const { updatePassword, updateEmail, currentUser } = useAuth();
    const [error, setError] = useState<string | null>();
    const [loading, setLoading] = useState<boolean>(false);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Should just redirect out of here if we don't have a current user.
        if (!currentUser) {
            return;
        }

        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const passwordConfirm = passwordConfirmRef.current?.value;

        if (password && passwordConfirm && password !== passwordConfirm) {
            setError("Password and confirm password must match");
            return;
        }

        const promises = [];

        if (email && email !== currentUser.email) {
            promises.push(updateEmail(email));
        }

        if (password) {
            promises.push(updatePassword(passwordRef.current?.value));
        }

        Promise.all(promises)
            .then(() => {})
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
                                placeholder="Leave blank to keep password the same"
                                required
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group id="passwordConfirm">
                            <Form.Label>Password Again</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Leave blank to keep password the same"
                                ref={passwordConfirmRef}
                                required
                            ></Form.Control>
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
