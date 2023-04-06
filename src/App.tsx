import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'All' | 'Active' | 'Completed'


function App() {

/*    const tasks1 = [
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false }
    ]*/

    let [tasks, setTasks] = useState([
            { id: 1, title: "HTML&CSS", isDone: true },
            { id: 2, title: "JS", isDone: true },
            { id: 3, title: "ReactJS", isDone: false }
        ]
    )

/*    let [filter, setFilter] = useState<FilterType>('All')

    let currentTasks = tasks*/


    const removeTask = (taskId:number) => {
        setTasks( tasks.filter( el => el.id !== taskId) )
        alert(taskId)
    }

/*    const filterTasks = (filterValue:FilterType) => {
        setFilter(filterValue)
    }

    if (filter === 'Active') {
        currentTasks = tasks.filter( el => !el.isDone)
    }
    if (filter === 'Completed') {
        currentTasks = tasks.filter( el => el.isDone)
    }*/

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasks}
                      removeTask = {removeTask}
/*                      filterTasks = {filterTasks}*/

            />

        </div>
    );
}

export default App;
