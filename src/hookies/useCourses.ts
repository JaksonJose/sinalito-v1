import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { useAuth } from "./useAuth";

type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

type Course = {
  id: string
  name: string,
  description: string,
  duration: string,
  position: number,
  lessons: Lessons[]
}


const usersRef = firestore.collection('users');

export function useCourses(){
  const [courses, setCourses] = useState<Course[]>();
  const { user } = useAuth();

  useEffect(() => {
       /* Fetch all courses which is avaliable to the user  */
       const FetchUserCourse = async () => {
        const snapshot = await usersRef.doc(user!.id).get();
        
        setCourses(snapshot.data()!.courses);
      }

    FetchUserCourse()

  }, [user!.id]);


  return { courses };
}