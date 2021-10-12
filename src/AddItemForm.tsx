import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

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
            <TextField
                variant={"outlined"}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error && "Title is required!"}
                value={title}/>
            <IconButton onClick={() => onClickAddItem(title)} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>
    )


}

export default AddItemForm