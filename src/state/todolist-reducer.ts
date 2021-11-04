import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    todoListId: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST",
    newTodoListId: string,
    title: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string,
    todoListId: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    value: FilterValuesType,
    todoListId: string
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todoListId: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', newTodoListId: v1(), title}
}

export const ChangeTodolistTitleAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListId}
}

export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, todoListId}
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: Array<TodoListType> = []

export const todoListsReducers = (todoLists: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    debugger
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return todoLists.filter(list => list.id !== action.todoListId)
        }
        case "ADD-TODOLIST": {
            const newTodoList: TodoListType = {
                id: action.newTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return todoLists.map(list => list.id === action.todoListId ? {...list, title: action.title} : list)
        }
        case "CHANGE-TODOLIST-FILTER": {
            debugger
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        }
        default:
            return todoLists
    }

}