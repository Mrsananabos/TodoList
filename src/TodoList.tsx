import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import s from './TodoList.module.css'
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Checkbox} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type PropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListID: string) => void
    removeTodoList: (id: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeStatus: (id: string, status: boolean, todoListID: string) => void
    changeTaskTitle: (id: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
    filter: FilterValuesType
}

function TodoList(props: PropsType) {

    const getTasks = props.tasks.map(t => {
            const onClickHandler = () => {
                props.removeTask(t.id, props.todoListID)
            };
            const onCheckboxChangedHandler = (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDoneValue = e.currentTarget.checked;
                props.changeStatus(t.id, newIsDoneValue, props.todoListID)
            }
            const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(t.id, title, props.todoListID)
            }
            return <li key={t.id}>
                <span className={t.isDone ? s.isDone : ""}>
                    <Checkbox checked={t.isDone}
                              onChange={onCheckboxChangedHandler}
                              color={"primary"}/>
                    <EditableSpan title={t.title} changeTitle={changeTaskTitle}/></span>
                <IconButton aria-label="delete" onClick={onClickHandler}>
                    <Delete/>
                </IconButton>
            </li>
        }
    )

    const onAllClickHandler = () => props.changeFilter('all', props.todoListID);

    const onActiveClickHandler = () => props.changeFilter('active', props.todoListID);

    const onCompletedClickHandler = () => props.changeFilter('done', props.todoListID);

    const addTask = (title: string) => {
        props.addTask(title, props.todoListID)
    }

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListID)
    }

    return <div>
        <h3>
           <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <IconButton aria-label="delete" onClick={e => props.removeTodoList(props.todoListID)}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul style={{listStyle: "none", paddingLeft: "0px"}}>
            {getTasks}
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'contained' : 'outlined'} size={"small"}
                    color={'primary'}
                    style={{margin: '3px'}}
                    onClick={onAllClickHandler}>All</Button>
            <Button variant={props.filter === 'active' ? 'contained' : 'outlined'} size={"small"}
                    color={'primary'} style={{margin: '3px'}}
                    onClick={onActiveClickHandler}>Active</Button>
            <Button variant={props.filter === 'done' ? 'contained' : 'outlined'} size={"small"}
                    color={'primary'} style={{margin: '3px'}}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}

export default TodoList;