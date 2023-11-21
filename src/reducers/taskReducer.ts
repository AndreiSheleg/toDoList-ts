import {TaskType} from "../Todolist";
import {v1} from "uuid";

export const taskReducer = (state: TaskType[], action: TsarType): TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK": {
            // let filteredTasks = tasks.filter(t => t.id != id);
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TASK": {
            // let task = { id: v1(), title: title, isDone: false };
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return [...state, newTask]
        }
        default:
            return state
    }
}

    //ТИПИЗАЦИЯ
    type TsarType = RemoveTaskACType | AddTaskACType

    type RemoveTaskACType = ReturnType<typeof removeTaskAC>
    export const removeTaskAC = (id: string) => {
        return {
            type: 'REMOVE-TASK',
            payload: {
                id: id
            }
        } as const
    }

    type AddTaskACType = ReturnType<typeof  addTaskAC>
    export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title
        }
    } as const
    }