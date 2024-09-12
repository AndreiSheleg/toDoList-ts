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


type Props = {
    todolist: TodolistType,
    removeTodolist: (todolistId: string) => void,
    updateTodolist: (id: string, title: string) => void,
    tasks: TaskType[]
}

export const Todolist = (props: Props) => {
    const {todolist, removeTodolist, updateTodolist, tasks } = props

    const dispatch=useDispatch()
    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }
    const addTaskCallback = (title: string) => {
        addTask(todolist.title, todolist.id)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(todolist.id, title)
    }

    return (
        <div>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={todolist.title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>

            <Tasks todolist={todolist}/>
            <FilterTasksButtons todolist={todolist}/>
        </div>
    )
}
