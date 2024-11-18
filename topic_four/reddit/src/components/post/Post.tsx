import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
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

interface Props {
    post: Post,
    setImgUrl: React.Dispatch<React.SetStateAction<string>>,
}


const SinglePost = ({post, setImgUrl}: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [hidePost, setHidePost] = useState(false);

    const postMenuClass = classNames('post-menu', {"isOpen": isMenuOpen});
    const hidePostClass = classNames('post-container', {"hide-post": hidePost})
    const dispatch = useDispatch();

    const handleRemovePostClick = () => {
        setHidePost(!hidePost);
        setTimeout(() => {
            dispatch(removePost(post.id));
            setHidePost(false)
        },300)
    }

    return (
        <div>
            <div className={hidePostClass}>
            <hr className="post-separator"/>
                <div className='post-container__info-container'>
                    <div className='post-container__info-container__left-side-container'>
                        <img src={post.user.user_image} alt="user_profile_pic"  className='post-container__info-container__left-side-container__img'/>
                        <span>{post.user.username}</span>
                        <span>.</span>
                        <span className='post-container__info-container__left-side-container__post-date'>
                            <ReactTimeAgo date={post.post_date} locale="en-US" />
                        </span>
                    </div>
                    <div className='post-container__info-container__right-side-container'>
                        <span onClick={() => setIsMenuOpen(!isMenuOpen)}><BsThreeDots/></span>
                    </div>
                </div>
                <p className='post-container__title'>{post.title}</p>
                {post.post_image ? 
                (<img src={post.post_image} alt="post_image"  className="post_container__img" onClick={() => setImgUrl(post.post_image || '')}/>) :
                (<p>{post.post_text}</p>)}
                <div className='post-container__interact-container'>
                    <div className='post-container__interact-container__single-container like_container'>
                        <PiArrowFatUp onClick={() => dispatch(addLike(post.id))}/>
                        <span>{post.likes}</span>
                        <PiArrowFatDown onClick={() => dispatch(addDislike(post.id))}/>
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <FaRegComment />
                        <span>{post.comments.length}</span>
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <SlBadge />
                    </div>
                    <div className='post-container__interact-container__single-container'>
                        <PiShareFatBold />
                        <span>Share</span>
                    </div>
                </div>
                <div className={postMenuClass}>
                    <div className="post-menu__menu-item">
                        <CiBookmark />
                        <span>Save</span>
                    </div>
                    <div className="post-menu__menu-item">
                        <BiHide />
                        <span onClick={handleRemovePostClick}>Hide</span>
                    </div>
                    <div className="post-menu__menu-item">
                        <CiFlag1 />
                        <span>Report</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePost
