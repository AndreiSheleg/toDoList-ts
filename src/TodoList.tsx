import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import AlarmIcon from '@mui/icons-material/Alarm';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    updateTask: (todolistID: string, taskID: string, newTitle: string) => void
    updateTodolist: (todolistID:string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter(props.todolistID, "all");
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, "active");
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, "completed");
    const removeTodoListHandler = () => props.removeTodoList(props.todolistID)


    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
    }

    const updateTodolistHandler = (newTitle: string) => {
        props.updateTodolist(props.todolistID, newTitle)
    }

    const updateTaskHandler = (tID:string, newTitle:string) => {
        props.updateTask(props.todolistID, tID, newTitle )
    }


    return <div>
        <h3>
            <EditableSpan oldTitle={props.title} callback={updateTodolistHandler}/>

            {/*кнопка удаления Тудулиста: ниже*/}
            {/*<button onClick={removeTodoListHandler}>x</button>*/}
            <IconButton aria-label="delete" onClick={removeTodoListHandler}>
                <DeleteIcon />
            </IconButton>
        </h3>

        <AddItemForm onClick={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    /*const updateTaskHandler = (newTitle:string) => {
                        props.updateTask(props.todolistID, t.id, newTitle )
                    }*/

                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
{/*                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>*/}
                        <Checkbox  onChange={onChangeHandler}
                                   checked={t.isDone}/>

                        <EditableSpan oldTitle={t.title} callback={(newTitle)=>updateTaskHandler(t.id, newTitle)}/>
                        {/*<button onClick={onClickHandler}>x</button>*/}
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
{/*            <button className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </button>*/}
            <Button variant={props.filter === 'all' ? 'outlined' : "contained"} color="success"  onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'outlined' : "contained"} color="primary" onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : "contained"} color="error"  onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
}
