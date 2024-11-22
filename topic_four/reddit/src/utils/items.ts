import { useEffect } from "react";
import { useSelector } from "react-redux"
import { Post } from "reducers/postsSlice";
import { RootState } from "store"
function useItems() {
    const posts = useSelector((state: RootState) => state.posts.posts);
    const LIMIT = 10;

    useEffect(() => {
        function fetchItems({ pageParam }: {pageParam: number}): Promise<{
            data: Post[],
            currentPage: number,
            nextPage: number | null,
        }> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        data: posts.slice(pageParam, pageParam + LIMIT),
                        currentPage: pageParam,
                        nextPage: pageParam + LIMIT < posts.length ? pageParam + LIMIT : null
                    });
                }, 1000);
            })
        }
    }, []);

}
