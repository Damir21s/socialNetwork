import { connect } from 'react-redux'
import { actions } from '../../../redux/reducerProfilePage'
import { AppReducerType } from '../../../redux/redux-store'
import { postsDataType } from '../../../types/types'
import MyPost from './myposts'
type mapDispatchToPropsType = {
  updateNewPostText: (text: string) => void
  addPost: () => void
}
type mapStateToPropsType = {
  postsData: Array<postsDataType>
  newPostText: string
}
let mapStateToProps = (state: AppReducerType): mapStateToPropsType => {
  return {
    postsData: state.profilePage.postsData,
    newPostText: state.profilePage.newPostText
  }
}
let mapDispatchToProps = (dispatch: any): mapDispatchToPropsType => {
  return {
    updateNewPostText: (text) => {
      dispatch(actions.updateNewPostActionCreator(text))
    },
    addPost: () => {
      dispatch(actions.addPostActionCreator())
    }
  }
}
const MyPostContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppReducerType>(mapStateToProps, mapDispatchToProps)(MyPost);
export default MyPostContainer;