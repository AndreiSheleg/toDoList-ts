import React, {useState} from 'react';
import {FilterType} from './App';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId:number) => void

}

export function Todolist(props: PropsType) {

    let [filter, setFilter] = useState<FilterType>('All')

    const filterTasks = (buttonName:FilterType) => {
        setFilter(buttonName)
    }

    let currentTasks = props.tasks

    if (filter === 'Active') {
        currentTasks = props.tasks.filter( el => !el.isDone)
    }
    if (filter === 'Completed') {
        currentTasks = props.tasks.filter( el => el.isDone)
    }


    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+Add</button>
        </div>
        <ul>
            {currentTasks.map( (el) => {
                debugger
                return (
                    <li key={el.id}>
                        <button onClick={ ()=> {props.removeTask(el.id)} }> ✖ </button>
                        <input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>


                    </li>
                )
                           })}
        </ul>

        <div>
            <button onClick={ () => filterTasks('All')} >All</button>
            <button onClick={ () => filterTasks('Active')}>Active</button>
            <button onClick={ () => filterTasks('Completed')}>Completed</button>
        </div>
    </div>
}
