import React from "react"
import { connect } from "react-redux";
import { follow, unfollow, getUsers } from "../../redux/reducerUsers";
import Users from "./users";
import Preloader from "../common/preloader/preloader";
import {
    getIsFetchingSelector, getIsFollowingProccesSelector,
    getTotalCountUsersSelector, getUsersSuperSelector
} from "../../redux/new-selector";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { AppReducerType } from "../../redux/redux-store";
import { usersType } from "../../types/types";
type mapDispatchToPropsType = {
    follow: (id: number) => void,
    unfollow: (id: number) => void,
    getUsers: (currentPage: number, currentPageSize: number) => void,
}
type mapStateToPropsType = {
    users: Array<usersType>,
    totalCountUsers: number,
    isFetching: boolean,
    isFollowingProcces: Array<number>
}
type ownPropsType = {

}
type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType
let UsersComponent: React.FC<PropsType> = (props) => {
    return <>
        {props.isFetching ? <Preloader /> : null}
        <Users totalCountUsers={props.totalCountUsers}
            users={props.users}
            unfollow={props.unfollow}
            follow={props.follow}
            getUsers={props.getUsers}
            isFollowingProcces={props.isFollowingProcces} />
    </>
}

let mapStateToProps = (state: AppReducerType): mapStateToPropsType => {
    return {
        users: getUsersSuperSelector(state),
        totalCountUsers: getTotalCountUsersSelector(state),
        isFetching: getIsFetchingSelector(state),
        isFollowingProcces: getIsFollowingProccesSelector(state)
    }
}
/*let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId))
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId))
        },
        setUsers: (userId) => {
            dispatch(setUsersAC(userId))
        },
        settotalCountUsers: (totalCount) => {
            dispatch(settotalCountUsersAC(totalCount))
        },
        setcurrentPage: (numberPage) => {
            dispatch(currentPageAC(numberPage))
        },
        toggleIsFetching: (isFetching) => {
            dispatch(isFetchingAC(isFetching))
        }
    }

}
 */

const UserContainer =
    connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, AppReducerType>
        (mapStateToProps, { follow, unfollow, getUsers })(UsersComponent);
export default UserContainer;
