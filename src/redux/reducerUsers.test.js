import UsersReducer, { actions } from "./reducerUsers";
let state
beforeEach(() => {
  state = {
    users:[
     {id: 0, name: "Damir", status: "hello", followed: false,  photos:{ small: null, large: null}},
     {id: 1, name: "Tamir", status: "hello", followed: false,  photos:{ small: null, large: null}},
     {id: 2, name: "Samir", status: "hello", followed: true,  photos:{ small: null, large: null}},
     {id: 3, name: "Pamir", status: "hello", followed: true,  photos:{ small: null, large: null}}  
    ],
    totalCountUsers: 0,
    pageSize: 5,
    currentPage: 1,
    isFollowingProcces: [],
    isFetching: true
}}) 
test("follow success", () => {
    const newState = UsersReducer(state, actions.followAccess(1))
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[1].followed).toBeTruthy();
})
test("unfollow success", () => {
    const newState = UsersReducer(state, actions.unfollowAccess(3))
    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})