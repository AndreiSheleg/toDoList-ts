import React, {ChangeEvent} from 'react';
import {Checkbox} from "@mui/material";

type PropsType = {
    checked: boolean;
    callBack: (value: boolean)=> void
}
export const CheckBoxControlled = (props: PropsType) => {
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        props.callBack(event.currentTarget.checked)
    }
    return (
        <Checkbox
            checked={props.checked}
            color="primary"
            onChange={onChangeHandler}
        />
    );
};