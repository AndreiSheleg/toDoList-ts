import React, {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "../../../../../../../Todolist.styles";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {TaskType, TodolistType} from "../../../../../../../app/App";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../../model/tasks-reducer";
import {useAppDispatch} from "../../../../../../../common/hooks/useAppDispatch";

type Props = {
    task: TaskType,
    todolist: TodolistType
}
export const Task = ( {task, todolist}: Props) => {
    const dispatch = useAppDispatch()

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isDone = e.currentTarget.checked
        dispatch(changeTaskStatusAC({taskId: task.id, isDone, todolistId: todolist.id}))
    }

    const changeTaskTitleHandler = (title: string) => {
        dispatch(changeTaskTitleAC({taskId: task.id, title, todolistId: todolist.id}) )
    }
    const removeTaskHandler = () => {
        dispatch(removeTaskAC({taskId: task.id, todolistId: todolist.id}) )
    }

    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan value={task.title} onChange={changeTaskTitleHandler} />
            </div>
            <IconButton onClick={removeTaskHandler}>
                <DeleteIcon />
            </IconButton>
        </ListItem>
    );
};
