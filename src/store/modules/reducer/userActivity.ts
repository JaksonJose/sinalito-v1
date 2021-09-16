import produce from "immer";

type Lesson = {
  id: number
  name: string,
  position: number,
  videoUrl: string | undefined
}

export function userActivity(state: Array<Lesson> = [], action: any){
  
  switch(action.type){
    case 'ADDACTIVITY':
      return produce(state, draft => {
        draft.push(action.activity);
      })
      
    default:
      return state;
  }
}