export const PostReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: payload.posts,
                cats: payload.cats,
                postLoading: false
            }
        case 'FIND_POSTS_SUCCESS':
            return {
                ...state,
                posts: payload,
                postLoading: false
            }
        case 'FIND_POSTS_FAIL':
            return {
                ...state,
                posts: {},
                postLoading: false
            }
        default:
            return state
    }
}
