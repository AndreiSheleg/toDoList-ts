import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = { id: string, title: string, filter: FilterValuesType }
type AssocTaskType = {
    [key: string]: TaskType[] // ТИПИЗАЦИЯ АССОЦИАТИВНОГО МАССИВА, ПРО КЛЮЧ ПРОСТО ЗАПОМНИТЬ
}

function App() {

    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, setTasks] = useState<AssocTaskType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Apples', isDone: false},
            {id: v1(), title: 'Eggs', isDone: false},
            {id: v1(), title: 'Kakao', isDone: false},
        ]
    })

    // let [tasks, setTasks] = useState([
    //     {id: v1(), title: 'HTML&CSS', isDone: true},
    //     {id: v1(), title: 'JS', isDone: true},
    //     {id: v1(), title: 'ReactJS', isDone: false},
    //     {id: v1(), title: 'Rest API', isDone: false},
    //     {id: v1(), title: 'GraphQL', isDone: false},
    // ]);
    //let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTask(todolistID: string, taskID: string) {
        // ПРЕЖДЕ ЧЕМ ЧТО-ТО ПОМЕНЯТЬ ИЛИ УДАЛИТЬ (УВИДЕЛ ОБЪЕКТ) - СДЕЛАЙ КОПИЮ
        // СЛЕДИМ, КОГДА ИСПОЛЬЗУЕМ МЭП ИЛИ ФИЛЬТР - ОНИ УЖЕ ДЕЛАЮТ КОПИЮ ПО-УМОЛЧАНИЮ
        // ЕСЛИ УВИДЕЛИ КЛЮЧ - СОЗДАЙ СТАРЫЙ НОВЫЙ КЛЮЧ ИЛИ ПЕРЕПИШИ ЕГО (ПОДОБНО СТАРЫЙ НОВЫЙ ГОД)
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskID)})
        // let filteredTasks = tasks.filter(t => t.id != id);
        // setTasks(filteredTasks);
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
        // let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];
        // setTasks(newTasks);
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        // НИЖЕ ОБРАТИ ВНИМАНИЕ - ЕСЛИ КЛЮЧ И ЗНАЧЕНИЕ iSDone совпали, ТО НЕ НАДО ПИСАТЬ ЕЩЁ РАЗ iSDone (iSDone: iSDone)
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)})
        // let task = tasks.find(t => t.id === taskId);
        // if (task) {
        //     task.isDone = isDone;
        // }
        //
        // setTasks([...tasks]);
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {

        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el))
    }

    const removeTodoList = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        // ЕСЛИ ДАННЫЕ БОЛЬШЕ НЕ ОТРИСОВЫВАЮТСЯ, ТО ИХ МОЖНО УДАЛИТЬ БЕЗ СОЗДАВАНИЯ КОПИИ (ИММУТАБЕЛЬНО)
        delete tasks[todolistID]
        console.log(tasks)
    }

    const addTodolist = (newTitle: string) => {
        const todolisID = v1()
        const newTodo: TodolistsType = {id: todolisID, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [todolisID]: []})
    }

    const updateTask = (todolistID: string, taskID: string, newTitle: string) => {
        console.log('звонок из функции updateTask, newTitle равно :', newTitle)
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    const updateTodolist = (todolistID: string, newTitle: string) => {
        console.log('звонок из функции updateTodolist, newTitle равно :', newTitle)
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{margin:'20px'}}>
                    <AddItemForm onClick={addTodolist}/>
                </Grid>
                <Grid container style={{margin:'20px'}}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                            // tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                            // tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                        }
                        return <Paper elevation={3} style={{padding: '20px', margin: '10px'}}>
                            <Todolist
                                key={el.id}
                                todolistID={el.id}
                                title={el.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={el.filter}
                                removeTodoList={removeTodoList}
                                updateTask={updateTask}
                                updateTodolist={updateTodolist}
                            />
                            </Paper >

                                            })}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
