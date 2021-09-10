
export function UserLesson(state = [], action: any){
  
  switch(action.type){
    case 'AddLesson':
      return [action.lesson];
    default:
      return state;
  }
}