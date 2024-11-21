import { render, screen, fireEvent, } from "../../test-utils";
import '@testing-library/jest-dom';
import SinglePost from "./Post";
import timeago from '../../utils/getFormatedDate';
import configureStore  from 'redux-mock-store';
import { store } from "store";
import { addLike, addDislike, removePost } from "reducers/postsSlice";
// import { useDispatch } from "react-redux";
import * as ReactRedux from 'react-redux';

describe('Post component', () => {
    const setImgUrlMock = jest.fn();
    const mockuseDispatch = jest.fn();
    
    // const useDispatch = () => mockuseDispatch;
    // const mockDispatch = jest.fn();
    // jest.mock('react-redux', () => ({
    //     ...jest.requireActual('react-redux'),
    //     useDispatch: () => mockuseDispatch
    //   }));
       
    const useDispatchMock = jest.spyOn(ReactRedux, 'useDispatch');
    const dispatchMock = jest.fn()
    useDispatchMock.mockReturnValue(dispatchMock)
 
      
    
    // jest.mock('reducers/postsSlice', () => ({
    //     addLike: jest.fn(),
    //     addDislike: jest.fn(),
    // }));

    const post = {
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

    beforeEach(() => {
        render(<SinglePost post={post} setImgUrl={setImgUrlMock}/>);
        // (useDispatch as jest.MockedFunction<typeof useDispatch>).mockReturnValue(mockDispatch);
    });

    test('render post', () => {
        const postSeparator = screen.getByRole('separator');
        expect(postSeparator).toBeInTheDocument();
        const userProfilePic = screen.getByAltText('user_profile_pic');
        expect(userProfilePic).toBeInTheDocument();
        const username = screen.getByText('u/test');
        expect(username).toBeInTheDocument();
        const postDate = screen.getByText(timeago(post.post_date))
        expect(postDate).toBeInTheDocument();
        const postMenuIcon = screen.getByTestId('postMenu');
        expect(postMenuIcon).toBeVisible();
        const postTitle = screen.getByText(post.title);
        expect(postTitle).toBeVisible();
        const postImg = screen.getByAltText('post_image');
        expect(postImg).toBeVisible();
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
        // const shareText = screen.getByRole('paragraph', {
        //     name: "Share"
        // });
        // console.log(shareText)
        // expect(shareText).toBeInTheDocument();
    });

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

    test.only('Increment like counter when click like button', () => {
        const likeBtn = screen.getByTestId('likeBtn');
        const likesCount = screen.getByTestId('likesCount');

        fireEvent.click(likeBtn);
        // console.log(likesCount.textContent = (post.likes + 1).toString())
        // expect(likesCount).toHaveTextContent('21')
        expect(dispatchMock).toHaveBeenCalledTimes(1);
    })
})

