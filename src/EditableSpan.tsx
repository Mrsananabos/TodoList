import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)

    const onEditMode = () => {setEditMode(true)}
    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (editMode ?
        <input autoFocus={true} value={title} onChange={onChangeTitle} onBlur={offEditMode}></input> :
        <span onDoubleClick={onEditMode}>{props.title}</span>)
}

export default EditableSpan