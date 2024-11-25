import React, { useState } from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { BsThreeDots } from "react-icons/bs";
import { PiArrowFatUp } from "react-icons/pi";
import { PiArrowFatDown } from "react-icons/pi";
import { FaRegComment } from "react-icons/fa6";
import { SlBadge } from "react-icons/sl";
import { PiShareFatBold } from "react-icons/pi";
import { CiBookmark } from "react-icons/ci";
import { BiHide } from "react-icons/bi";
import { CiFlag1 } from "react-icons/ci";

import { addLike, addDislike, removePost } from "reducers/postsSlice";
import { Post } from 'reducers/postsSlice';
import './style.css'
import timeAgo from '../../utils/getFormatedDate';
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    post: Post,
    setImgUrl: React.Dispatch<React.SetStateAction<string>>,
    filterOption: string
}


const SinglePost = ({post, setImgUrl, filterOption}: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidePost, setHidePost] = useState(false);

    const postMenuClass = classNames('post-menu', {"isOpen": isMenuOpen});
    const hidePostClass = classNames('post-container', {"hide-post": hidePost});
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const handleLike = () => {
        dispatch(addLike(post.id));
        
        queryClient.setQueryData(['items', filterOption], (oldData:any) => {
            if (!oldData) return oldData;

            const updatedPages = oldData.pages.map((page:any) => ({
                ...page,
                data: page.data.map((p:any) =>
                    p.id === post.id ? { ...p, likes: p.likes + 1 } : p
                ),
            }));
            console.log({ ...oldData, pages: updatedPages })
            return { ...oldData, pages: updatedPages };
        });
    };

    const handeDislike = () => {
        dispatch(addDislike(post.id));
        
        queryClient.setQueryData(['items', filterOption], (oldData:any) => {
            if (!oldData) return oldData;

            const updatedPages = oldData.pages.map((page:any) => ({
                ...page,
                data: page.data.map((p:any) =>
                    p.id === post.id ? { ...p, likes: p.likes - 1 } : p
                ),
            }));
    
            return { ...oldData, pages: updatedPages };
        });
    };
    
    const handleRemove = () => {

        setHidePost(!hidePost);
        setTimeout(() => {
            dispatch(removePost(post.id));
            queryClient.setQueryData(['items', filterOption], (oldData:any) => {
              if (!oldData) return oldData;
        
              const updatedPages = oldData.pages.map((page:any) => ({
                ...page,
                data: page.data.filter((p:any) => p.id !== post.id),
              }));
        
              return { ...oldData, pages: updatedPages };
            });
            setHidePost(false);
        }, 300);
    
      };

    return (
        <div>
            <div className={hidePostClass} data-testid='post-container'>
            <hr className="post-separator"/>
                <div className='post-container__info-container'>
                    <div className='post-container__info-container__left-side-container'>
                        <img src={post.user.user_image} alt="user_profile_pic"  className='post-container__info-container__left-side-container__img'/>
                        <span>{post.user.username}</span>
                        <span>.</span>
                        <span className='post-container__info-container__left-side-container__post-date'>
                            <span>{timeAgo(post.post_date)}</span>
                        </span>
                    </div>
                    <div className='post-container__info-container__right-side-container'>
                        <span onClick={() => setIsMenuOpen(!isMenuOpen)} data-testid='postMenu'><BsThreeDots/></span>
                    </div>
                </div>
                <p className='post-container__title'>{post.title}</p>
                {post.post_image ? 
                (<img src={post.post_image} alt="post_image"  className="post_container__img" onClick={() => setImgUrl(post.post_image || '')}/>) :
                (<p data-testid='post-description'>{post.post_text}</p>)}
                <div className='post-container__interact-container'>
                    <div className='post-container__interact-container__single-container like_container'>
                        <span  data-testid='likeBtn' onClick={handleLike}><PiArrowFatUp /></span>
                        <span data-testid='likesCount'>{post.likes}</span>
                        <span data-testid='dislikeBtn' onClick={handeDislike}><PiArrowFatDown/></span>
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <span data-testid="commentBtn"><FaRegComment/></span>
                        <span data-testid='commentCount'>{post.comments.length}</span>
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <span data-testid="badgeBtn"><SlBadge/></span>
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <span data-testid="shareBtn"><PiShareFatBold/></span>
                        <span role="paragraph">Share</span>
                    </div>
                </div>
                <div className={postMenuClass} data-testid='post-options'>
                    <div className="post-menu__menu-item" data-testid='single-option'>
                        <CiBookmark />
                        <span role="paragraph">Save</span>
                    </div>
                    <div className="post-menu__menu-item" data-testid='single-option'>
                        <BiHide />
                        <span role="paragraph"  data-testid='hide-btn' onClick={handleRemove}>Hide</span>
                    </div>
                    <div className="post-menu__menu-item" data-testid='single-option'>
                        <CiFlag1 />
                        <span role="paragraph">Report</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
