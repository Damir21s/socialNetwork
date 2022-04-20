import Dialogs from "./dialogs";
import { actions } from "../../redux/reducerMessagesPage";
import {connect} from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { AppReducerType } from "../../redux/redux-store";

let mapStateToProps = (state: AppReducerType) =>{
   return{
    DialogsData: state.messagesPage.DialogsData,
    MessagesData: state.messagesPage.MessagesData,
    newMessageText: state.messagesPage.newMessageText,
    isAuth: state.auth.isAuth
   }
}
let mapDispatchToProps = (dispatch: (arg0: { type: "ADD-MESSAGE" | "UPDATE-NEW-MESSAGE-TEXT"; NewText?: string; }) => void) => {
   return{
    addMessage: () => {
        dispatch(actions.addMessageActionCreator())
    },
    onMessageChange: (body: string) => {
        dispatch(actions.updateNewMessageActionCreator(body))
    }
   }
}
export default compose(
    connect (mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);