'use client';
import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, addDoc, collection, Timestamp, updateDoc, doc, deleteDoc } from 'firebase/firestore';

import { auth, firebase_app } from '../firebase';
const db = getFirestore(firebase_app);

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const pSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                console.log('Signed in 2');
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
                console.log('Logout 2');
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
                console.log('Signed up 2');
                return true;
            })
            .catch((error) => {
                alert(error.message);
                return false;
            });
    };

    const addNote = (title, content) => {
        const note = {
            title: title,
            content: content,
            date: Timestamp.now(),
        };
        addDoc(collection(db, user.uid), note)
            .then(() => {
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
                return false;
            });
        return true;
    };

    const editNote = (id, title, content) => {
        const note = {
            title: title,
            content: content,
            date: Timestamp.now(),
        };
        updateDoc(doc(db, user.uid, id), note)
            .then(() => {
                console.log('Document successfully overwritten!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
                return false;
            });
        return true;
    };
    const deleteNote = (id) => {
        confirm('Are you sure you want to delete this note?') &&
            deleteDoc(doc(db, user.uid, id))
                .then(() => {
                    console.log('Document successfully deleted!');
                })
                .catch((error) => {
                    console.error('Error writing document: ', error);
                    return false;
                });
        return true;
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
        <AuthContext.Provider value={{ user, pSignIn, pSignUp, addNote, editNote, deleteNote, logOut }}>
            {loading ? (
                <div className="flex min-h-screen">
                    <div className="flex flex-col items-center justify-center flex-1">Loading...</div>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};
