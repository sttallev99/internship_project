import App from "App";
import Posts from "components/posts/Posts";
import PostsV2 from "components/posts_v2/PostsV2";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: "", element: <Posts />},
            { path: "/posts-v2", element: <PostsV2 />}
        ]
    }
])
