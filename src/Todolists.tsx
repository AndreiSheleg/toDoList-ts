import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./app/store";
import {FilterValuesType, TasksStateType, TodolistType} from "./app/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./model/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./model/todolists-reducer";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist";

export const Todolists = () => {
    const dispatch = useDispatch()
    const todolists = useSelector<RootState, TodolistType[]>((state) => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>((state) => state.tasks)

    return (
        <>
            {todolists.map((tl) => {

                return (
                    <Grid key={tl.id}>
                        <Paper sx={{p: '0 20px 20px 20px'}}>
                            <Todolist
                                key={tl.id}
                                todolist = {tl}
                            />
                        </Paper>
                    </Grid>
                )
            })}
        </>


    );
};
