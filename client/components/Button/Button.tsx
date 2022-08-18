import React from 'react'
import { useTheme } from '../../context/them.context';
import classes from "./button.module.scss"

interface Props {
    text: string;
    type: 'submit' | 'button' | 'reset';
    onClick?: () => any;
    className?: string
}

const Button = ({ text, onClick, className, type }: Props) => {
    const customClass = classes.button + " " + className
    const { theme } = useTheme()
    return <button
        onClick={onClick}
        type={type}
        className={`${customClass} ${classes[theme]}`}>
        {text}
    </button>

}

export default Button