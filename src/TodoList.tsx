import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from './conponents/Button';
import styles from './Todolist.module.css'

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
    changeIsDone: (newId: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {
    const [error, setError] = useState<string | null>('')
    const [newTitleInput, setNewTitleInput] = useState('')

    const addTaskHandler = () => {
        if (newTitleInput.trim()) {
            props.addTask(newTitleInput.trim())
            setNewTitleInput('')
        } else {
            setError('Title is requared!')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('') // сетаем для того, чтобы пропадала красная рамка вокруг импута при условии предыдущей ошибки
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

    let [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const onClickHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
        setButtonName(value)
    }


    return (
        <div>
            <h3>{props.title}</h3>

            <div>
                <input className={error ? styles.error : ''} value={newTitleInput}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                {/*замена на компоненту <button onClick={addTaskHandler}>+</button> */}
                <Button name={'+'} callBack={addTaskHandler}/>
                {error && <div className={styles.errorMessage}>{error}</div>}
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
                                <li key={t.id} className={ t.isDone ? styles.isDone : ''}>
                                    <input type="checkbox" checked={t.isDone} onChange={changeIsDoneHandler}/>
                                    <span>{t.title}</span>
                                    {/*замена на компоненту <button onClick={()=>removeTaskHandler(t.id)}> x </button>*/}
                                    <Button name={'x'} callBack={() => removeTaskHandler(t.id)}/>
                                </li>
                            )
                        }
                    )
                }
            </ul>
            <div>
                <button className={ buttonName==='all' ? styles.activeFilter : ''} onClick={ () => onClickHandler('all') } >
                    All
                </button>
                <button className={ buttonName==='active' ? styles.activeFilter : ''} onClick={ () => onClickHandler('active') }>
                    Active
                </button>
                <button className={ buttonName==='completed' ? styles.activeFilter : ''} onClick={() => onClickHandler('completed')}>
                    Completed
                </button>
            </div>
        </div>
    )
}