import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "done";

type TodoListType = {
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

function App() {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const [todoList, setTodoList] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        debugger
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    function removeTask(taskId: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id != taskId)
        setTasks({...tasks})
    }

    function changeFilter(value: FilterValuesType, todoListID: string) {
        setTodoList(todoList.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    }

    function changeStatus(taskId: string, status: boolean, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === taskId);
        if (task) {
            task.isDone = status;
        }
        setTasks({...tasks})
    }

    function changeTaskTitle(taskId: string, title: string, todoListID: string) {
        let task = tasks[todoListID].find(t => t.id === taskId);
        if (task) {
            task.title = title;
        }
        setTasks({...tasks})
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        setTodoList(todoList.map(list => list.id === todoListID ? {...list, title} : list))
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
        setTodoList(todoList.filter(list => list.id != id))
        delete tasks[id]
        setTasks({...tasks})
    }

    function addTodoList(title: string) {
        const newTodoListId = v1();
        const newTodoList: TodoListType = {
            id: newTodoListId,
            title,
            filter: "all"
        }
        setTodoList([...todoList, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const getTodoListComponents = todoList.map(tl => {
        return <TodoList todoListID={tl.id}
                         title={tl.title}
                         tasks={getTasksForTodoList(tl)}
                         removeTask={removeTask}
                         removeTodoList={removeTodoList}
                         addTask={addTask}
                         changeFilter={changeFilter}
                         filter={tl.filter}
                         changeStatus={changeStatus}
                         changeTaskTitle={changeTaskTitle}
                         changeTodoListTitle={changeTodoListTitle}/>
    })

    return (
        <div className='App'>
            <AddItemForm addItem={addTodoList}/>
            {getTodoListComponents}
        </div>
    );
}

export default App;
