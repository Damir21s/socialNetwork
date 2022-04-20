import React, { LegacyRef, MutableRefObject, RefObject} from 'react';
import { postsDataType } from '../../../types/types';
import s from './myposts.module.css';
import Post from './post/post';
type PropsType = {
  postsData: Array<postsDataType>,
  addPost: ()=> void,
  updateNewPostText: (text:string) => void,
  newPostText: string
}
const MyPost: React.FC<PropsType> = ({postsData, addPost, updateNewPostText, newPostText}) => {
  let postsMap = postsData.map(m => <Post messeges={m.messeges} likescount={m.likescount} />
  )
  let newPostElement: RefObject<HTMLTextAreaElement> = React.createRef();
  let onAddPost = () => {
    addPost();
  }
  let onPostChange = () => {
    let text = newPostElement.current!.value;
    updateNewPostText(text);
  }
  return (
    <div className={s.post}>
      <h3>MyPost</h3>
      <div>
         
        <textarea onChange={onPostChange} value={newPostText} ref = {newPostElement} cols={40} rows={5}></textarea>
      </div>
      <button onClick={onAddPost}>Add</button>
      {postsMap}
    </div>
  )
}
export default MyPost;