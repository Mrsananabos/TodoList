import {TaskStateType, TodoListType} from "../App";
import {AddTodolistAC, todoListsReducers} from "./todolist-reducer";
import { tasksReducers } from "./task-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodolistAC("new todolist");

    const endTasksState = tasksReducers(startTasksState, action)
    const endTodolistsState = todoListsReducers(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.newTodoListId);
    expect(idFromTodolists).toBe(action.newTodoListId);
});
