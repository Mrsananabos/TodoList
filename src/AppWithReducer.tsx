import React, {useCallback, useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducers
} from "./state/todolist-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducers} from "./state/task-reducer";

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

function AppWithRedux() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoList, dispatchToTodoList] = useReducer(todoListsReducers, [
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducers, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Whater', isDone: true},
            {id: v1(), title: 'Butter', isDone: true},
            {id: v1(), title: 'Orange', isDone: false}
        ]
    })

    function addTask(title: string, todoListID: string) {
        const action = AddTaskAC(todoListID, title)
        dispatchToTasks(action)
    }

    function removeTask(taskId: string, todoListID: string) {
        const action = RemoveTaskAC(todoListID, taskId)
        dispatchToTasks(action)
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        const action = ChangeTodoListFilterAC(value, todoListID)
        dispatchToTodoList(action)
    }

    function changeTaskStatus(taskId: string, status: boolean, todoListID: string) {
        const action = ChangeTaskStatusAC(taskId, status, todoListID)
        dispatchToTasks(action)
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        const action = ChangeTaskTitleAC(title, todoListID, taskId)
        dispatchToTasks(action)
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const action = ChangeTodolistTitleAC(title, todoListID)
        dispatchToTodoList(action)
    }

    function getTasksForTodoList(todoList: TodoListType) {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "done":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    function removeTodoList(id: string) {
        const action = RemoveTodolistAC(id)
        dispatchToTodoList(action)
    }

    const addTodoList = useCallback((title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    }, [])

    const getTodoListComponents = todoList.map(tl => {
        return <Grid item key={tl.id}><Paper elevation={5} style={{padding: "15px"}}>
            <TodoList todoListID={tl.id}
                      title={tl.title}
                      tasks={getTasksForTodoList(tl)}
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

export default AppWithRedux;
