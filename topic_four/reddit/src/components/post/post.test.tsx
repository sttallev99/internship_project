import { render, screen, fireEvent, queryByTestId, } from "../../test-utils";
import '@testing-library/jest-dom';
import SinglePost from "./Post";
import timeago from '../../utils/getFormatedDate';
import { addLike, addDislike, removePost } from "reducers/postsSlice";


const mockedDispatch = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockedDispatch
}));

describe('Post component', () => {
    const setImgUrlMock = jest.fn();
    const mockPost = {
        id: 1,
        title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
        user: {
            username: "u/test",
            user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
        },
        post_date: 1731760782001,
        post_image: 'https://external-preview.redd.it/96QLllPueIqVo9Y9fTetsCdtbJm9xgWnjuIppVqh24g.jpg?width=1080&crop=smart&auto=webp&s=8de8e8cf9c4991840dd0d635ac348a3e5a1be73e',
        likes: 20,
        comments: ['fist comment', 'second comment']
    }    
    const mockPostV2 = {
        id: 1,
        title: "For the first time since 2018, VueJS has a CVE. This XSS vulnerability affects v2.0 up to before v3.0. Learn More.",
        user: {
            username: "u/test",
            user_image: "https://styles.redditmedia.com/t5_948sqb/styles/profileIcon_5rv5fal4shib1.jpeg?width=256&height=256&frame=1&auto=webp&crop=256:256,smart&s=0deb86294f6a2a71c856bde693e9881efab12380"
        },
        post_date: 1731760782001,
        post_text: 'ala-bala',
        likes: 20,
        comments: ['fist comment', 'second comment']
    }    

    beforeEach(() => {
        render(<SinglePost post={mockPost} setImgUrl={setImgUrlMock} filterOption=""/>);
        jest.clearAllMocks();

    });

    test('render post', () => {
        const postSeparator = screen.getByRole('separator');
        expect(postSeparator).toBeInTheDocument();
        const userProfilePic = screen.getByAltText('user_profile_pic');
        expect(userProfilePic).toBeInTheDocument();
        const username = screen.getByText('u/test');
        expect(username).toBeInTheDocument();
        const postDate = screen.getByText(timeago(mockPost.post_date))
        expect(postDate).toBeInTheDocument();
        const postMenuIcon = screen.getByTestId('postMenu');
        expect(postMenuIcon).toBeVisible();
        const postTitle = screen.getByText(mockPost.title);
        expect(postTitle).toBeVisible();
        const postImg = screen.getByAltText('post_image');
        expect(postImg).toBeInTheDocument();
        const likeBtn = screen.getByTestId('likeBtn');
        expect(likeBtn).toBeInTheDocument();
        const likesCount = screen.getByTestId('likesCount');
        expect(likesCount).toBeInTheDocument();
        const dislikeBtn = screen.getByTestId('dislikeBtn');
        expect(dislikeBtn).toBeInTheDocument();
        const commentBtn = screen.getByTestId('commentBtn');
        expect(commentBtn).toBeInTheDocument();
        const commentCount = screen.getByTestId('commentCount');
        expect(commentCount).toBeInTheDocument();
        const badgeBtn = screen.getByTestId('badgeBtn');
        expect(badgeBtn).toBeInTheDocument();
        const shareBtn = screen.getByTestId('shareBtn');
        expect(shareBtn).toBeInTheDocument();
        const postText = screen.queryByTestId('post-description');
        expect(postText).not.toBeInTheDocument();
    });

    test('it should show post description if post object didnt contain "post-image" property', () => {
        render(<SinglePost post={mockPostV2} setImgUrl={setImgUrlMock} filterOption=""/>);
        const postText = screen.queryByTestId('post-description');
        expect(postText).toBeInTheDocument();

    });

    test('open post image when click on it', () => {
        const postImg = screen.getByAltText('post_image');
        fireEvent.click(postImg);

        expect(setImgUrlMock).toHaveBeenCalled();
    })

    test('open post options menu when click button', () => {
        const postOptions = screen.getByTestId('post-options');
        expect(postOptions).toBeInTheDocument();
        const singleOptionCount = screen.getAllByTestId('single-option')
        expect(singleOptionCount.length).toBe(3);
        const postMenuIcon = screen.getByTestId('postMenu');

        fireEvent.click(postMenuIcon);
        expect(postOptions.classList).toContain('isOpen');

        fireEvent.click(postMenuIcon);
        expect(postOptions.classList).not.toContain('isOpen');
    });

    test('Remove post when hide button is clicked', () => {
        jest.useFakeTimers();

        const hideBtn = screen.getByTestId('hide-btn');
        
        fireEvent.click(hideBtn);

        const postContainer = screen.getByTestId('post-container');
        expect(postContainer).toHaveClass('hide-post');

        jest.runAllTimers();
        expect(mockedDispatch).toHaveBeenCalledWith(removePost(1));
    })

    test('dispatches addLike when like button is clicked', () => {
        const likeBtn = screen.getByTestId('likeBtn');

        fireEvent.click(likeBtn);
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(addLike(mockPost.id));
    });
    
    test('dispatch addDislike when click dislike button', () =>  {
        const dislikeBtn = screen.getByTestId('dislikeBtn');

        fireEvent.click(dislikeBtn);
        
        expect(mockedDispatch).toHaveBeenCalledTimes(1);
        expect(mockedDispatch).toHaveBeenCalledWith(addDislike(mockPost.id))
    })
})

