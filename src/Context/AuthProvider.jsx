import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';

const AuthProvider = ({children}) => {

    const register = (email, pass) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, pass);
    }

    const login = (email, pass) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const googleProvider  = new GoogleAuthProvider();

    const signInWithGoogle = ()=> {
        return signInWithPopup(auth, googleProvider)
    }

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    console.log(user);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            console.log('User on auth changed', currentUser)
            setUser(currentUser)
            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    },[])

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUser = (updateInfo)=> {
        return updateProfile(auth.currentUser, updateInfo)
    }

    const authInfo = { register, login, signInWithGoogle, signOutUser, updateUser, loading, user, setUser };

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;