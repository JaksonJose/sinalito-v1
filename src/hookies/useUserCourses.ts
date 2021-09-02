import { useEffect, useState } from "react";
import { firestore } from "../services/firebase";
import { useAuth } from "./useAuth";

type UserCourses = {
  courseId: string
}

const usersRef = firestore.collection('users');

export function useUserCourses(){
  const [userCourses, setUserCourses] = useState<UserCourses>();
  
  const { user } = useAuth();

  useEffect(() => {FetchUserCourse();}, []);

     /* Fetch all courses which is avaliable to the user  */
     const FetchUserCourse = async () => {
      const snapshot = await usersRef.doc(user?.id).collection('courses').get();
     
      snapshot.docs.forEach((course) => {
         const courses = {
           courseId: course.id
         }

         setUserCourses(courses);
      });
     }

  return { userCourses };
}