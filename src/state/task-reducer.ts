import {FilterValuesType, TaskStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolist-reducer";

type RemoveTaskAT = {
    type: "REMOVE-TASK",
    todoListId: string,
    taskId: string
}

type AddTaskAT = {
    type: "ADD-TASK",
    title: string,
    todoListId: string
}

type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE",
    title: string,
    todoListId: string,
    taskId: string
}

type ChangeTaskFilterAT = {
    type: "CHANGE-TASK-FILTER"
    filter: FilterValuesType,
    todoListId: string,
    taskId: string
}

type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    status: boolean,
    todoListId: string,
    taskId: string
}

export const RemoveTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', todoListId, taskId}
}

export const AddTaskAC = (todoListId: string, title: string): AddTaskAT => {
    return {type: 'ADD-TASK', todoListId, title}
}

export const ChangeTaskTitleAC = (title: string, todoListId: string, taskId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', title, todoListId, taskId}
}

export const ChangeTaskFilterAC = (filter: FilterValuesType, todoListId: string, taskId: string): ChangeTaskFilterAT => {
    return {type: 'CHANGE-TASK-FILTER', filter, todoListId, taskId}
}

export const ChangeTaskStatusAC = (taskId: string, status: boolean, todoListId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', status, todoListId, taskId};
}

type ActionType = AddTaskAT | RemoveTaskAT | ChangeTaskFilterAT | ChangeTaskTitleAT | ChangeTaskStatusAT | AddTodoListAT
| RemoveTodoListAT

export const tasksReducers = (state: TaskStateType, action: ActionType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id != action.taskId)}
        }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListId]: [...state[action.todoListId], newTask]}
        }
        case "CHANGE-TASK-FILTER": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    filter: action.filter
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todoListId]: state[action.todoListId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.status
                } : t)
            }
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.newTodoListId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            // let {[action.todoListId]: [], ...ss} = {...state};
            let copyState = {...state}
            delete copyState[action.todoListId]
            return copyState;
        }
        default:
            throw new Error('I need a type')
    }

}