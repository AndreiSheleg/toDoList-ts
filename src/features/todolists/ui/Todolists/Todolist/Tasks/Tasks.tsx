import React, {ChangeEvent} from 'react';
import {TasksStateType, TodolistType} from "../../../../../../app/App";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../app/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../model/tasks-reducer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Task} from "./Task/Task";
import {useAppDispatch} from "../../../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../../../common/hooks/useAppSelector";
import {selectTasks} from "../../../../model/tasksSelectors";

type Props = {
    todolist: TodolistType
}

export const Tasks = ({todolist}: Props) => {
    const dispatch = useAppDispatch()

    const tasks = useAppSelector<RootState, TasksStateType>(selectTasks)

    const allTodolistTasks = tasks[todolist.id]

    let tasksForTodolist = allTodolistTasks

    if (todolist.filter === 'active') {
        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
    }

    if (todolist.filter === 'completed') {
        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
    }

    return (
        <>
            {tasksForTodolist.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
                    {tasksForTodolist.map(task => {
                        return (
                            <Task task={task} todolist={todolist}/>
                        )
                    })}
                </List>
            )}
        </>
    )
}