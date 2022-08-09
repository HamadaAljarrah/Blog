import React from "react";
import { useTheme } from "../../context/them.context";
import classes from "./background.module.scss";
type Props = {
    children: React.ReactNode
};

const Background = ({ children }: Props) => {
    const {theme} = useTheme();
    return <div className={`${classes.background} ${classes[theme]}`}>{children}</div>;
};

export default Background;
