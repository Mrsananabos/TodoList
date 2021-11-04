import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import Task from './Task';

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

    function getSortedTasks() {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "done":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(taskId, props.todoListID)
    }, [props.removeTask, props.todoListID]);

    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(taskId, title, props.todoListID)
    }, [props.changeStatus, props.todoListID])

    const changeStatus = useCallback((taskId: string, status: boolean) => {
        props.changeStatus(taskId, status, props.todoListID)
    }, [props.changeStatus])

    const getTasks = getSortedTasks().map(t => {
            return <Task key={t.id} task={t}
                         removeTask={removeTask}
                         changeTaskTitle={changeTaskTitle}
                         changeStatus={changeStatus}
            />
        }
    )

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.todoListID), [props.changeFilter, props.todoListID]);

    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.todoListID), [props.changeFilter, props.todoListID]);

    const onCompletedClickHandler = useCallback(() => props.changeFilter('done', props.todoListID), [props.changeFilter, props.todoListID]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListID)
    }, [props.addTask, props.todoListID])

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListID) }, [props.todoListID])


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

export default React.memo(TodoList);