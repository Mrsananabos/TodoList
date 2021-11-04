import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import s from "./TodoList.module.css";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./AppWithRedux";

export type TaskPropsItem = {
    task: TaskType,
    changeStatus: (id: string, status: boolean) => void
    changeTaskTitle: (id: string, title: string) => void,
    removeTask: (id: string) => void
}

const Task = (props: TaskPropsItem) => {
    console.log(" Task")
    const {id, title, isDone} = props.task;

    const onClickHandler = useCallback(() => {
        props.removeTask(id)
    }, [props.removeTask, id]);

    const onCheckboxChangedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeStatus(id, newIsDoneValue)
    }, [props.changeStatus, id])

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(id, title)
    }, [props.changeStatus, id])


    return <li key={id}>
                <span className={isDone ? s.isDone : ""}>
                    <Checkbox checked={isDone}
                              onChange={onCheckboxChangedHandler}
                              color={"primary"}/>
                    <EditableSpan title={title} changeTitle={changeTaskTitle}/></span>
        <IconButton aria-label="delete" onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
}

export default React.memo(Task)