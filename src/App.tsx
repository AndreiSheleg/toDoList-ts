import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    const changeIsDone = (newId: string, newIsDone: boolean) => {
        // метод map работает с массивами и СОЗДАЁТ НОВЫЙ МАССИВ, Т.Е. СПРЕД ОПЕРАТОР НЕ НУЖЕН
        // увидел массив - сделай копию, увидел объект - сделай копию, увидел ключ - создавай новый с именем старого ключа
        setTasks(tasks.map(el => el.id === newId ? {...el, isDone: newIsDone} : el))
    }

    const addTask = (newTitleInput: string) => {
        let newTask = {id: v1(), title: newTitleInput, isDone: false}
        /*... - озночает, что мы "высыпаем" элементы из массива объекта
        * всё равно как покупаем яблоки у бабушки на дороге - тару-ведро нам
        * не продают, нужен свой ящик или банка
        * [ ] - создаём новый "ящик"*/
        setTasks([newTask, ...tasks])

        //console.log('звоним из функции эддТаск')
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    let [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksForTodolist = tasks;

    if (filter === 'active') {
        tasksForTodolist = tasks.filter(t => t.isDone === false);
    }
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeIsDone={changeIsDone}
            />
        </div>
    );
}

export default App;
