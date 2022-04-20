import React  from 'react';
import { NavLink } from "react-router-dom";
import s from "./dialogItem.module.css";
type PropsType ={
    id: number
    name: string
}
const DialogItem: React.FC<PropsType> = ({id, name}) => {
    return (
        <div className={s.Dialog}>
            <div className = {s.picture}></div>
            <div className = {s.fone}><NavLink to={"/dialog/" + id}>{name}</NavLink></div>
        </div>
    )
}
export default DialogItem;