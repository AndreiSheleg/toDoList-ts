import {ChangeEvent} from "react";
import {AddItemForm} from "../../../../../common/components/AddItemForm/AddItemForm";
import {FilterValuesType, TaskType, TodolistType} from "../../../../../app/App";
import {EditableSpan} from "../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "../../../../../Todolist.styles";
import {FilterTasksButtons} from "./FilterTasksButtons/FilterTasksButtons";
import {Tasks} from "./Tasks/Tasks";
import {useDispatch} from "react-redux";
import {addTaskAC} from "../../../model/tasks-reducer";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {useAppDispatch} from "../../../../../common/hooks/useAppDispatch";


type Props = {
    todolist: TodolistType,
}

export const Todolist = ({todolist}: Props) => {
    const dispatch = useAppDispatch()
    const addTaskCallback = (title: string,) => {
        dispatch(addTaskAC({title, todolistId: todolist.id}))
    }

    return (
        <>
            <TodolistTitle todolist={todolist} />
                <AddItemForm addItem={addTaskCallback}/>
                <Tasks todolist={todolist}/>
                <FilterTasksButtons todolist={todolist}/>

        </>

    )
}
