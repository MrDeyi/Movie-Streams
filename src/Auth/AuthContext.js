import { useContext,createContext, useEffect, useState } from "react";
import { GoogleAuthProvider,signInWithPopup,signOut,onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
const AuthContext=createContext();

export default function AuthContextProvider({children}){
    const [user ,setUser]=useState({});
    const googleSignIn=()=>{
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    }
    const logout=()=>{
        signOut(auth);
    }
    useEffect(()=>{
        const unsubscrible = onAuthStateChanged(auth,(currentUser)=>{
              setUser(currentUser)
        });
        return ()=>{unsubscrible();}

    })
    return(
        <AuthContext.Provider value={{googleSignIn,logout,user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}