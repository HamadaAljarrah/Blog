import React from "react";
import { useTheme } from "../../context/them.context";
import classes from "./Container.module.scss";
type Props = {
    children: React.ReactNode;
    className?: string
};

const Container = ({ children, className }: Props) => {
    const theClass = classes.container + " " + className
    const {theme} = useTheme()
    return <div className={`${theClass} ${classes[theme]}`}>{children}</div>;
};

export default Container;
