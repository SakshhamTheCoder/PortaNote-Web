"use client";
import { useContext, createContext, useState, useEffect } from "react";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const pSignIn = (email, password) => {

        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Signed in 2");
            })
            .catch((error) => {
                alert(error.message);
                return false;
            });
        return true;
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Logout 2");
                return true;
            })
            .catch((error) => {
                alert(error.message);
                return false;
            });
    };

    const pSignUp = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log("Signed up 2");
                return true;
            })
            .catch((error) => {
                alert(error.message);
                return false;
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) setUser(currentUser);
            else setUser(null);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, pSignIn, pSignUp, logOut }}>
            {loading ?
                <div className="flex min-h-screen">
                    <div className="flex flex-col items-center justify-center flex-1">
                        Loading...
                    </div>
                </div>
                : children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};