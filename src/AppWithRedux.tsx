import React, {useCallback} from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {AddTodolistAC, ChangeTodoListFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolist-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = "all" | "active" | "done";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {

    const todoList = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()


    const addTask = useCallback((title: string, todoListID: string) => {
        const action = AddTaskAC(todoListID, title)
        dispatch(action)
    }, [dispatch])

    const removeTask = useCallback((taskId: string, todoListID: string) => {
        const action = RemoveTaskAC(todoListID, taskId)
        dispatch(action)
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        const action = ChangeTodoListFilterAC(value, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: boolean, todoListID: string) => {
        const action = ChangeTaskStatusAC(taskId, status, todoListID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListID: string) => {
        const action = ChangeTaskTitleAC(title, todoListID, taskId)
        dispatch(action)
    }, [dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        const action = ChangeTodolistTitleAC(title, todoListID)
        dispatch(action)
    }, [dispatch])

    const removeTodoList = useCallback((id: string) => {
        const action = RemoveTodolistAC(id)
        dispatch(action)
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const getTodoListComponents = todoList.map(tl => {
        return <Grid item key={tl.id}><Paper elevation={5} style={{padding: "15px"}}>
            <TodoList todoListID={tl.id}
                      title={tl.title}
                      tasks={tasks[tl.id]}
                      removeTask={removeTask}
                      removeTodoList={removeTodoList}
                      addTask={addTask}
                      changeFilter={changeFilter}
                      filter={tl.filter}
                      changeStatus={changeTaskStatus}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}/>
        </Paper>
        </Grid>
    })

    return (
        <div className='App'>
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton color={"inherit"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={"h6"}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"} variant={"outlined"}>
                        Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {getTodoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
