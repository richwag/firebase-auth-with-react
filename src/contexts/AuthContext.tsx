import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

interface IContextValue {
    currentUser: firebase.User | null;
    signup(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential>;
    login(
        email: string,
        password: string
    ): Promise<firebase.auth.UserCredential>;
    logout(): Promise<void>;
    resetPassword(email: string): Promise<void>;
    updateEmail(email: string): Promise<void>;
    updatePassword(password: string): Promise<void>;
}

const AuthContext = React.createContext<IContextValue>({} as IContextValue);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            console.log("auth state changed");
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    async function signup(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    async function login(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    async function logout() {
        return auth.signOut();
    }

    async function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email);
    }

    async function updateEmail(email: string) {
        return auth.currentUser?.updateEmail(email);
    }

    async function updatePassword(password: string) {
        return auth.currentUser?.updatePassword(password);
    }

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
    };

    auth.onAuthStateChanged((user) => {
        setCurrentUser(user);
    });

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
