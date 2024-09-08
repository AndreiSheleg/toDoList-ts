import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./model/todolists-reducer";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "./AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";
import {FilterValuesType, TasksStateType, TodolistType} from "./app/App";
import {Todolists} from "./Todolists";

export const Main = () => {
    const dispatch = useDispatch()
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }


    return (
        <Container fixed>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>

            <Grid container spacing={4}>
                <Todolists/>
            </Grid>
        </Container>
    );
};