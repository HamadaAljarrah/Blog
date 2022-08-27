import React from 'react'
import { useTheme } from '../../context/them.context'
import classes from "./select.module.scss"

export type SelectOption = {
    key: string,
    value: string | number
}

type Props = {
    htmlFor: string,
    label: string,
    register: any,
    options?: SelectOption[]
}

const Categories: SelectOption[] = [
    { key: 'Development', value: 'Development' },
    { key: 'Health', value: 'Health' },
    { key: 'Travel', value: 'Travel' },
    { key: 'Inspiration', value: 'Inspiration' },
]


const Select = ({ htmlFor, label, register, options = Categories }: Props) => {
    const { theme } = useTheme()
    return (
        <div className={`${classes.wrapper} ${classes[theme]}`}>
            <label htmlFor={htmlFor}>{label}</label>
            <select {...register} >
                {options?.map(
                    (option: SelectOption) =>
                        <option key={option.value} value={option.value}>
                            {option.key}
                        </option>
                )}
            </select>
        </div>
    )
}

export default Select