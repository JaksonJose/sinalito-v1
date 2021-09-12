import { useState, useEffect, createContext, ReactNode } from 'react';
import { auth, firebase } from '../services/firebase';

type User = {
  id: string;
  firstName: string;
  avatar: string;
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

export function AuthContextProvider({children}: AuthProps){
  const [user, setUser] = useState<User | null>(null);
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
  const SetDataToFirestore = async (user: User) => {
    const isData = await firebase.firestore().collection('users').doc(user.id).get();

    /* Prevent to overwrite the database info. */
    if (isData.exists){
      return;
    }
    
    await firebase.firestore().collection('users').doc(user.id).set(user);
  }

  /* Set data into localStorage */
  const SetLocalStorage = (userData: User) => {
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