import React  from 'react';
import { NavLink } from "react-router-dom";
import s from "./dialogItem.module.css";
const DialogItem = (props) => {
    return (
        <div className={s.Dialog}>
            <div className = {s.picture}></div>
            <div className = {s.fone}><NavLink to={"/dialog/" + props.id}>{props.name}</NavLink></div>
        </div>
    )
}
export default DialogItem;