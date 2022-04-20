import React  from 'react';
import s from "./../dialogs.module.css";
type PropType = {
    message: string
} 
const MessageItem: React.FC<PropType> = ({message}) => {
        return (
            <div className={s.message}>{message}</div>
        )
    }
export default MessageItem;