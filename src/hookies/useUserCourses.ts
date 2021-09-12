import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { useAuth } from "./useAuth";

type UserCourses = {
  id: string
}


const usersRef = firestore.collection('users');

export function useUserCourses(){
  const [userCourses, setUserCourses] = useState<UserCourses[]>();
  
  const { user } = useAuth();

  useEffect(() => {
       /* Fetch all courses which is avaliable to the user  */
       const FetchUserCourse = async () => {
        const snapshot = await usersRef.doc(user!.id).get();
        
        setUserCourses(snapshot.data()?.courses);

      }

    FetchUserCourse()

  }, [user!.id]);


  return { userCourses };
}