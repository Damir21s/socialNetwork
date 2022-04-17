import React from "react"
import { useEffect, useState } from "react"
import "./users.css"
import noAvatarPicture from "./../../assets/no-avatar.png"
import { NavLink } from "react-router-dom"
import { Pagination } from 'antd'
import 'antd/dist/antd.css'
import { usersType } from "../../types/types"
type PropsType = {
    totalCountUsers: number,
    users: Array<usersType>,
    isFollowingProcces: Array<number>,
    getUsers: (currentPage: number, currentPageSize: number )=> void,
    unfollow: (id: number)=> void,
    follow: (id: number)=> void,  
}
let Users: React.FC<PropsType> = ({totalCountUsers, users, isFollowingProcces, getUsers, unfollow, follow}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    useEffect(() =>{
        getUsers(currentPage, currentPageSize)
        console.log(currentPage, currentPageSize)
    },[currentPage, currentPageSize])

    return (
        <div>
            <Pagination onShowSizeChange={(current, size)=>{setCurrentPageSize(size)}}  onChange={(page, pageSize)=>{setCurrentPage(page)}}
             pageSizeOptions = {[5,10,20,totalCountUsers]} defaultCurrent={1} total={totalCountUsers} />
            {users.map(u => <div key={u.id}>
                <div><NavLink to={"/profile" + "/" + u.id}>
                    <img src={u.photos.small == null ? (u.photos.small = noAvatarPicture) : u.photos.small} className={"photo"}></img>
                </NavLink>
                </div>
                <div>{u.followed ? <button disabled={isFollowingProcces.some(id => id === u.id)} onClick={() => {
                    unfollow(u.id)
                }}>unfollow</button> : <button disabled={isFollowingProcces.some(id => id === u.id)} onClick={() => {
                    follow(u.id)
                }}>follow</button>}</div>
                <div>{u.name}</div>
                <div>{u.status}</div>
                <div>u.location.country</div>
                <div>u.location.city</div>
            </div>)}
        </div>
    )



}
export default Users;