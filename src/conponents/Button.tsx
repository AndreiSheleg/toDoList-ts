import React from 'react';

type PropsType = {
    name: string
    callBack:()=>void
    // size: medium | large | small
    // corners - углы скруглённые или нет
    // color цвет кнопки
    // кнопка со значком стрелка или без значка withArrow
    //disabled
}


export const Button = (props: PropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <>
            <button onClick={onClickHandler}>{props.name}</button>
        </>
    );
};
