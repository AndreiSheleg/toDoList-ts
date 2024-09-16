import React from 'react';
import {RootState} from "../../../../app/store";
import {FilterValuesType, TasksStateType, TodolistType} from "../../../../app/App";
import Grid from "@mui/material/Unstable_Grid2";
import Paper from "@mui/material/Paper";
import {Todolist} from "./Todolist/Todolist";
import {useAppDispatch} from "../../../../common/hooks/useAppDispatch";
import {useAppSelector} from "../../../../common/hooks/useAppSelector";

export const Todolists = () => {
    const dispatch = useAppDispatch()
    const todolists = useAppSelector<RootState, TodolistType[]>((state) => state.todolists)
    const tasks = useAppSelector<RootState, TasksStateType>((state) => state.tasks)

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
