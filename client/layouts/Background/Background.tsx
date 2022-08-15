import React from "react";
import { useTheme } from "../../context/them.context";
import classes from "./background.module.scss";
type Props = {
    children: React.ReactNode,
    className?: string
};

const Background = ({ children, className }: Props) => {
    const {theme} = useTheme();
    const theClass = `${classes.background} ${className}`
    return <div className={`${classes[theme]} ${theClass}`}>{children}</div>;
};

export default Background;
