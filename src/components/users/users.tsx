import React from "react"
import { useEffect, useState } from "react"
import "./users.css"
import noAvatarPicture from "./../../assets/no-avatar.png"
import { NavLink } from "react-router-dom"
import { Pagination } from 'antd'
import 'antd/dist/antd.css'
import { useDispatch, useSelector } from "react-redux"
import { getIsFollowingProccesSelector, getTotalCountUsersSelector, getUsersSuperSelector } from "../../redux/new-selector"
import { follow, getUsers, unfollow } from "../../redux/reducerUsers"
let Users = () => {
    const totalCountUsers = useSelector(getTotalCountUsersSelector) 
    const users = useSelector(getUsersSuperSelector)
    const isFollowingProcces = useSelector(getIsFollowingProccesSelector)
    const dispatch = useDispatch()
    const followProcess = (id: number) => {
        dispatch(follow(id))
    }
    const unfollowProcess = (id: number) => {
        dispatch(unfollow(id))
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    useEffect(() =>{
        dispatch(getUsers(currentPage, currentPageSize))
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
                    unfollowProcess(u.id)
                }}>unfollow</button> : <button disabled={isFollowingProcces.some(id => id === u.id)} onClick={() => {
                    followProcess(u.id)
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