import profileReducer, {addPostActionCreator, deletePost, initialStateType} from "./profile-reducer";

beforeEach(() => {

})
let initialState: initialStateType = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ], newPostText: "",
    profile: null,
    status: ""
};
test('test reducer length', () => {
    const action = addPostActionCreator('it-kamasutra.com')
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(5)
    expect(newState.posts[4].message).toBe('it-kamasutra.com')
})
test('delete length', () => {
    const action = deletePost(1)
    let newState = profileReducer(initialState, action)
    expect(newState.posts.length).toBe(3)
})