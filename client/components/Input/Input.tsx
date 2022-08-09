import React from 'react'
import { useTheme } from '../../context/them.context'
import classes from "./input.module.scss"

type Props = {
    label: string,
    type: string,
    placeholder: string,
    forNameId: string
}


export const Input = ({ label, type, placeholder, forNameId }: Props) => {
    const { theme } = useTheme();
    return (
        <div className={`${classes.input} ${classes[theme]}`}>
            <label htmlFor={forNameId}>{label}</label>
            <input
                type={type}
                name={forNameId}
                id={forNameId}
                placeholder={placeholder}
                required
            />
        </div>
    )
}
