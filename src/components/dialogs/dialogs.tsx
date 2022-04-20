import React, { ChangeEvent }  from 'react';
import s from "./dialogs.module.css";
import DialogItem from "./dialogItem/dialogItem";
import MessageItem from "./messaegeItem/messageItem";
import { dialogsDataType, messagesData } from '../../types/types';
type PropsType = {
    DialogsData: Array<dialogsDataType>
    MessagesData: Array<messagesData>
    addMessage: () => void
    onMessageChange: (body: string) => void
    newMessageText: string
}
const Dialogs: React.FC<PropsType> = ({DialogsData, MessagesData, addMessage, onMessageChange, newMessageText}) => {
    let DialogsMap = DialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
    let MessagesMap = MessagesData.map(m => <MessageItem message={m.messages} />);
    let onAddMessage = () => {
        addMessage();
    }
    let onMessageChanges = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let body = e.target.value;
        onMessageChange(body);
    }
    return (
        <div className={s.Dialogs}>
            <div className={s.DialogItems}>
                {DialogsMap}
            </div>
            <div className={s.messages}>
                {MessagesMap}
                <textarea onChange={onMessageChanges} value={newMessageText} className={s.textarea} ></textarea>
                <button className={s.buttonSend} onClick={onAddMessage}>Send</button>
            </div>
        </div>

    )

}
export default Dialogs;