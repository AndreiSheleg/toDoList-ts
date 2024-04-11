import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type SecondActionType = {
    type: 'YYY'
}


type ActionsType = RemoveTaskActionType | SecondActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId)
            }
        case 'YYY':
            return state
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId:string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const secondAC = (title: string): SecondActionType => {
    return {type: 'YYY'}
}

