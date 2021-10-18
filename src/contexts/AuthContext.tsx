import { useState, useEffect, createContext, ReactNode } from 'react';
import { auth, firebase, firestore } from '../services/firebase';

type User = {
  id: string;
  firstName: string;
  avatar: string;
  courses?: Array<Object>
}

type AuthContextType = {
  user: User | null,
  SignInWithGoogleAccount: () => Promise<void>,
  Signout: () => Promise<void>,
  loading: boolean,
  isSigned: boolean,
}

type AuthProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

const usersRef = firestore.collection('users');

export function AuthContextProvider({children}: AuthProps){
  const [user, setUser] = useState<any | null>(null);
  const[loading, setLoading] = useState(true);

  useEffect(() => {
    
    function LoadStorage() {      
      const storageUser = localStorage.getItem('sinalitoUser');

        if (storageUser){
            setUser(JSON.parse(storageUser));
            setLoading(false);
        }

        setLoading(false);
    }

    LoadStorage();

  }, [])
  
  /* This function allows and autenticate the signin throught google account */
  /* Get the google account information and store in localstorage */
  const SignInWithGoogleAccount = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    
    const result = await auth.signInWithPopup(provider);

    if (result.user){
      const { displayName, photoURL, uid } = result.user;

      const snapshot = await usersRef.doc(uid).get();

      // if user data already exist, set to local storage
      if(snapshot) {
        SetLocalStorage(snapshot.data());
        setUser(snapshot.data());
        return;
      }
      
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      const userData = {
        id: uid,
        firstName: displayName,
        avatar: photoURL,
      }

      setUser(userData);
      SetLocalStorage(userData);
      SetDataToFirestore(userData);
    }
  }

  /* saving user information in database */
  const SetDataToFirestore = async (user: User) =>  await usersRef.doc(user.id).set(user);

  /* Set data into localStorage */
  const SetLocalStorage = (userData: any) => {
    localStorage.setItem('sinalitoUser', JSON.stringify(userData));
  }

  const Signout = async () => {
    await auth.signOut();

    localStorage.removeItem('sinalitoUser');
    setUser(null);
}

  return(
    <AuthContext.Provider value={{ isSigned: !!user, user, loading, SignInWithGoogleAccount, Signout }}>
      {children}
    </AuthContext.Provider>
    );
}