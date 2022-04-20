import { connect } from 'react-redux'
import { actions } from '../../../redux/reducerProfilePage'
import { AppReducerType } from '../../../redux/redux-store'
import MyPost from './myposts'
let mapStateToProps = (state: AppReducerType) => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch: (arg0: { type: "ADD-POST" | "UPDATE-NEW-POST-TEXT"; NewText?: string }) => void) => {
  return {
    updateNewPostText: (text: string) => {
      dispatch(actions.updateNewPostActionCreator(text))
    },
    addPost: () => {
      dispatch(actions.addPostActionCreator())
    }
  }
}
const MyPostContainer = connect(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;