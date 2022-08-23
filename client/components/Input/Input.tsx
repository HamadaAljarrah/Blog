import React from 'react'
import { useTheme } from '../../context/them.context'
import classes from "./input.module.scss"

interface Props {
    label: string;
    htmlFor: string;
    type: 'file' | 'text' | 'password' | 'email';
    placeholder: string;
    register?: any;
}


const Input = ({ label, htmlFor, type, placeholder, register }: Props) => {
    const { theme } = useTheme();
    return (
        <div className={`${classes.input} ${classes[theme]}`}>
            <label htmlFor={htmlFor}>{label}</label>
            <input
                {...register}
                type={type}
                placeholder={placeholder}
                required
            />
        </div>
    )
}

export default Input;