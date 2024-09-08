import React from 'react';
import Box from "@mui/material/Box";
import {filterButtonsContainerSx} from "./Todolist.styles";
import Button from "@mui/material/Button";
import {FilterValuesType} from "./app/App";

export const FilterTasksButtons = () => {

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button
                variant={filter === 'all' ? 'outlined' : 'text'}
                color={'inherit'}
                onClick={() => changeFilterTasksHandler('all')}>
                All
            </Button>
            <Button
                variant={filter === 'active' ? 'outlined' : 'text'}
                color={'primary'}
                onClick={() => changeFilterTasksHandler('active')}>
                Active
            </Button>
            <Button
                variant={filter === 'completed' ? 'outlined' : 'text'}
                color={'secondary'}
                onClick={() => changeFilterTasksHandler('completed')}>
                Completed
            </Button>
        </Box>
    );
};
