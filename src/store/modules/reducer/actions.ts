type Lesson = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}


export function AddLessons(lessons: Array<Lesson>){
  return {
    type: "ADDLESSONS",
    lessons
  }
}

export function AddActivity(activity: Lesson){
  return {
    type: "ADDACTIVITY",
    activity
  }
}