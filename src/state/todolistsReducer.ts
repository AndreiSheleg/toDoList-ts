import {TodolistType} from "../App";

export const todolistsReducer = (state: TodolistType[], action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        default: return state
    }
}