import { createSelector } from 'reselect'
import { AppReducerType } from "./redux-store";
const getUsersSelector = (state: AppReducerType) =>{
    return state.usersPage.users;
}
export const getUsersSuperSelector = createSelector(getUsersSelector, (users) =>{
    return users.filter(u=> true);
});
export const getTotalCountUsersSelector = (state: AppReducerType) =>{
    return state.usersPage.totalCountUsers;
}
export const getPageSizeSelector = (state: AppReducerType) =>{
    return state.usersPage.pageSize;
}
export const getIsFetchingSelector = (state: AppReducerType) =>{
    return state.usersPage.isFetching;
}
export const getIsFollowingProccesSelector = (state: AppReducerType) =>{
    return state.usersPage.isFollowingProcces;
}