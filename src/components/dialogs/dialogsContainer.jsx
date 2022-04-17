import Dialogs from "./dialogs";
import { actions } from "../../redux/reducerMessagesPage";
import {connect} from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";

let mapStateToProps = (state) =>{
   return{
    DialogsData: state.messagesPage.DialogsData,
    MessagesData: state.messagesPage.MessagesData,
    newMessageText: state.messagesPage.newMessageText,
    isAuth: state.auth.isAuth
   }
}
let mapDispatchToProps = (dispatch) => {
   return{
    addMessage: () => {
        dispatch(actions.addMessageActionCreator())
    },
    onMessageChange: (body) => {
        dispatch(actions.updateNewMessageActionCreator(body))
    }
   }
}
export default compose(
    connect (mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);