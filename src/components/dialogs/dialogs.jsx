import React  from 'react';
import s from "./dialogs.module.css";
import DialogItem from "./dialogItem/dialogItem";
import MessageItem from "./messaegeItem/messageItem";
const Dialogs = (props) => {
    let DialogsMap = props.DialogsData.map(d => <DialogItem name={d.name} id={d.id} />);
    let MessagesMap = props.MessagesData.map(m => <MessageItem message={m.messages} />);
    let addMessage = () => {
        props.addMessage();

    }
    let onMessageChange = (e) => {
        let body = e.target.value;
        props.onMessageChange(body);
    }
    return (
        <div className={s.Dialogs}>
            <div className={s.DialogItems}>
                {DialogsMap}
            </div>
            <div className={s.messages}>
                {MessagesMap}
                <textarea onChange={onMessageChange} value={props.newMessageText} className={s.textarea} ></textarea>
                <button className={s.buttonSend} onClick={addMessage}>Send</button>
            </div>
        </div>

    )

}
export default Dialogs;