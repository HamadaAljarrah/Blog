import { useTheme } from "../../context/them.context"
import classes from "./textarea.module.scss"

interface Props {
    height?: number;
    htmlFor: string;
    label?: string;
    register?: any

}

const TextArea = ({ register, label = "Textarea", htmlFor, height = 200 }: Props) => {
    const { theme } = useTheme();
    return (
        <div className={`${classes.textarea} ${classes[theme]}`} style={{ height: `${height.toString()}px` }}>

            <label htmlFor={htmlFor} >{label}</label>
            <textarea
                {...register}
                style={{ height: `${(height - 4).toString()}px` }}
            />
        </div>

    )
}

export default TextArea