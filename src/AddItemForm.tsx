import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from "./TodoList.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            onClickAddItem(title)
        }
    }

    const onClickAddItem = (title: string) => {
        if (title.trim() !== '') {
            debugger
            props.addItem(title)
        } else {
            setError("Title is required!")
        }
        setTitle('')
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? s.error : ''}/>
            <button onClick={() => onClickAddItem(title)}>+</button>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    )


}

export default AddItemForm