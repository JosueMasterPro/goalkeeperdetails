import { createContext, useContext, useState, useEffect } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if(!context){
        throw new Error("There is not auth Provider");
    }
    return context;
}

export function AuhtProvider({ children }){
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);
    
    const signup = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
      const login = (email, password) => {
        //console.log(email, password);
        return signInWithEmailAndPassword(auth, email, password);
      };

      const logout = () => signOut(auth);

      useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          //console.log({ currentUser });
          setUser(currentUser);
          setLoading(false);
        });
        return () => unsubuscribe();
      }, []);

    return (    
        <authContext.Provider value={{ 
            signup,
            login,
            logout, 
            user,
            loading
        }}> {children} 
        
        </authContext.Provider>
    )
}