import profilePageReducer, { actions, addPostActionCreator } from "./reducerProfilePage";

let initialState = {
    postsData: [
        { id: 1, messeges: "hi, its my first post", likescount: 2 },
        { id: 2, messeges: "Today smile", likescount: 3 }
    ]
}

test('length of posts should be incremented', () => {
    let action = actions.addPostActionCreator("hello guys");
    let state = initialState;
    let newState = profilePageReducer(state, action)
    expect(newState.postsData.length).toBe(3);
});
  