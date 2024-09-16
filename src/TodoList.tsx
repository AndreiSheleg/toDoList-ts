import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {FilterValuesType, TaskType, TodolistType} from "./app/App";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";
import {FilterTasksButtons} from "./FilterTasksButtons";
import {Tasks} from "./Tasks";
import {useDispatch} from "react-redux";
import {addTaskAC} from "./model/tasks-reducer";


type Props = {
    todolist: TodolistType,
}

export const Todolist = (props: Props) => {
    const {todolist} = props

    const dispatch=useDispatch()

    const addTaskCallback = (title: string,) => {
        dispatch(addTaskAC({title, todolistId:todolist.id}))
    }

    return (
        <div>
             <AddItemForm addItem={addTaskCallback}/>
            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
