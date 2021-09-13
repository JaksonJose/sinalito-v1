import { useEffect } from "react";
import { useAuth } from "../hookies/useAuth";
import { firestore } from "../services/firebase";


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

const coursesRef = firestore.collection('courses');
const userRef = firestore.collection('users');

export function CoursesContext(){
  const { user } = useAuth();
  
    useEffect(() => {
       FetchAllCourses();
    }, [])

  // Fetch all courses avaliable in platform
  const FetchAllCourses = async () => {
    const snapshot = await coursesRef.get();
    
    const isCollectionEmpty = snapshot.size === 0;
    
    if (!isCollectionEmpty){
      let list = Array<Course>();
      
      snapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          name: doc.data().name,
          description: doc.data().details,
          duration: doc.data().duration,
          position: doc.data().position,
          lessons: doc.data().lessons
        })
        
        // Sort order the array by position
        list.sort((a, b) => (a.position > b.position) ? 1 : ((b.position > a.position) ? -1 : 0));
      });

      // update de user courses, make a mirror of course
      await userRef.doc(user!.id).update({
        courses: list
      });
    }
  }
}