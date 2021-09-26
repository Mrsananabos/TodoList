import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import s from './TodoList.module.css'
import AddItemForm from "./AddItemForm";

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, status: boolean, todoListID: string) => void
    filter: FilterValuesType
}

function TodoList(props: PropsType) {
    // const [title, setTitle] = useState('')
    // let [error, setError] = useState<string | null>(null)

    const getTasks = props.tasks.map(t => {
            const onClickHandler = () => {
                props.removeTask(t.id, props.todoListID)
            };
            const onCheckboxChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeStatus(t.id, newIsDoneValue, props.todoListID)
            }
            return <li key={t.id} className={t.isDone ? s.isDone : ""}>
                <input type="checkbox"
                       onChange={onCheckboxChangedHandler}
                       checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        }
    )
    // const addTask = (name: string) => {
    //     if (name.trim() !== '') {
    //         debugger
    //         props.addTask(name, props.todoListID)
    //     } else {
    //         setError("Title is required!")
    //     }
    //     setTitle('')
    // }

    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    //
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     setError(null)
    //     if (e.charCode === 13) {
    //         addTask(title)
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter('all', props.todoListID);
    const onActiveClickHandler = () => props.changeFilter('active', props.todoListID);
    const onCompletedClickHandler = () => props.changeFilter('done', props.todoListID);
    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    return <div>
        <h3>{props.title}<button onClick={e => props.removeTodoList(props.todoListID)}>x</button></h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {getTasks}
        </ul>
        <div>
            <button className={props.filter === 'all' ? s.activeFilter : ''} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === 'active' ? s.activeFilter : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'done' ? s.activeFilter : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

export default TodoList;