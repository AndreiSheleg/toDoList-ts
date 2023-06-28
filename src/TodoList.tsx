import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './conponents/Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitleInput: string) => void
    changeIsDone: (newId:string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [newTitleInput, setNewTitleInput] = useState('')

    const addTaskHandler = () => {
        props.addTask(newTitleInput)
        setNewTitleInput('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitleInput(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input value={newTitleInput}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler} />
                {/*замена на компоненту <button onClick={addTaskHandler}>+</button> */}
                <Button name={'+'} callBack={addTaskHandler} />
            </div>

            <ul>
                {
                    props.tasks.map(t => {
                            //remove task вынос функции из мэпа, а потом пробуем вынести над общим ретурном на 37 строке
                            /*const removeTaskHandler = () => {
                                props.removeTask(t.id)
                            }*/
                        const changeIsDoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeIsDone(t.id, event.currentTarget.checked)
                        }
                            return (
                                <li key={t.id}>
                                    <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler} />
                                    <span>{t.title}</span>
                                    {/*замена на компоненту <button onClick={()=>removeTaskHandler(t.id)}> x </button>*/}
                                    <Button name={'x'} callBack={ () => removeTaskHandler(t.id) } />
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>
                    All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>
                    Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>
                    Completed
                </button>
            </div>
        </div>
    )
}