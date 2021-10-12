import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    todoListId: string
}

type AddTodoListAT = {
    type: "ADD-TODOLIST",
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
    return {type: 'ADD-TODOLIST', title}
}

export const ChangeTodolistAC = (title: string, todoListId: string): ChangeTodoListTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', title, todoListId}
}

export const ChangeTodoListFilterAC = (value: FilterValuesType, todoListId: string): ChangeTodoListFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', value, todoListId}
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducers = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return todoLists.filter(list => list.id != action.todoListId)
        }
        case "ADD-TODOLIST": {
            const newTodoListId = v1();
            const newTodoList: TodoListType = {
                id: newTodoListId,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodoList]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return todoLists.map(list => list.id === action.todoListId ? {...list, title: action.title} : list)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.value} : tl)
        }
        default:
            return todoLists
    }

}