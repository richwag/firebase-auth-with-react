import { Button, Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

export default function HomePage() {
    const authContext = useAuth();

    function logOut() {
        authContext?.logout();
    }

    return (
        <>
            <Card>
                <Card.Body>Home page</Card.Body>
                <Button href="/UpdateProfile">Update Profile</Button>
            </Card>
            <Button variant="link" onClick={logOut}>
                Log Out
            </Button>
        </>
    );
}
