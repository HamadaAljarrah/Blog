
import Router from 'next/router';
import React from 'react'
import { useTheme } from '../../context/them.context';
import classes from "./button.module.scss"


interface Props {
    text: string;
    type: 'submit' | 'button' | 'reset';
    link?: string;
    onClick?: () => any;
    className?: string
}
const Button = ({ text, onClick, className, type, link }: Props) => {
    const customClass = classes.button + " " + className
    const { theme } = useTheme()
    return link !== undefined ?
        <button
            onClick={() => Router.push(link)}
            className={`${customClass} ${classes[theme]}`}>
            {text}
        </button>
        :
        <button
            onClick={onClick}
            type={type}
            className={`${customClass} ${classes[theme]}`}>
            {text}
        </button>

}

export default Button