import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import Login from "./Login";
import { Authenticated } from "./Authenticated";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";

function App() {
    return (
        <AuthProvider>
            <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
            >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/Signup" element={<Signup />} />
                            <Route
                                path="/"
                                element={
                                    <Authenticated element={<HomePage />} />
                                }
                            />
                            <Route
                                path="/UpdateProfile"
                                element={
                                    <Authenticated
                                        element={<UpdateProfile />}
                                    />
                                }
                            />
                            <Route path="/Login" element={<Login />} />
                            <Route
                                path="/ForgotPassword"
                                element={<ForgotPassword />}
                            />
                        </Routes>
                    </BrowserRouter>
                </div>
            </Container>
        </AuthProvider>
    );
}

export default App;
