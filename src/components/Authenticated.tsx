import { Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export interface AuthenticatedProps extends RouteProps {
    redirectPath?: string;
    element?: React.ReactNode | null;
}

export const Authenticated = ({
    element,
    redirectPath,
}: AuthenticatedProps) => {
    const auth = useAuth();

    return (
        <>
            {auth?.currentUser ? (
                element
            ) : (
                <Navigate to={redirectPath ? redirectPath : "/Login"} />
            )}
        </>
    );
};
