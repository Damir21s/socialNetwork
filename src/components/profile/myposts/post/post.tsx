import React from 'react';
import s from './post.module.css';
type PropsType = {
    likescount: number,
    messeges: string
}
const Post: React.FC<PropsType> = ({likescount, messeges}) =>{
 return(
  <div className = {s.post}>
      <div className = {s.fone}></div>
      <div className = {s.messages}>{messeges}</div>
      <div>
          <span>like</span>
          {likescount}
      </div>
  </div> 
 )
}
export default Post;