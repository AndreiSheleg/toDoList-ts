import React from 'react';
import {TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: TaskType[]
}
export const TodoList = (props: TodoListPropsType) => {
// в продакшене не делают логигу или методы мэп внутри вёрстки,
    // мэп выносят или в переменную или в компоненту
    const tasksMap =  props.tasks.map((el) => {
        debugger
        return (
            <li>
                <input type="checkbox" checked={el.isDone}/>
                <span>{el.title}</span>
            </li>
        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input placeholder="write new task..."/>
                <button>+add</button>
            </div>

            <ul>
                {tasksMap}


                {/*<li><input type="checkbox" checked={props.tasks[0].isDone}/><span>{props.tasks[0].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/><span>{props.tasks[1].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/><span>{props.tasks[2].title}</span></li>
                <li><input type="checkbox" checked={props.tasks[3].isDone}/><span>{props.tasks[3].title}</span></li>*/}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
