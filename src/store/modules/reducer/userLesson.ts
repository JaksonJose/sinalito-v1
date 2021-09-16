type Lessons = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function userLesson(state = [], action: any){
  
  switch(action.type){
    case 'ADDLESSON':
      return [action.lesson];
    default:
      return state;
  }
}