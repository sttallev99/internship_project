import { store } from "store";
import { addLike, addDislike, removePost } from "./postsSlice";

describe('test posts slice', () => {
    test('add like to specific post', () => {
        let state = store.getState().posts.posts;
        store.dispatch(addLike(1));

        state = store.getState().posts.posts;
        const post = state.find(p => p.id === 1);
        expect(post?.likes).toBe(21);
    })
    test('remove like from specific post', () => {
        let state = store.getState().posts.posts;
        store.dispatch(addDislike(1));

        state = store.getState().posts.posts;
        const post = state.find(p => p.id === 1);
        expect(post?.likes).toBe(20);
    })
    test('remove post from state', () => {
        let state = store.getState().posts.posts;
        store.dispatch(removePost(10));

        state = store.getState().posts.posts;
        expect(state).toHaveLength(42);
    })
})
