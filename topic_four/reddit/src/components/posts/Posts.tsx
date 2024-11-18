import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import SinglePost from '../post/Post';
import './style.css';
import Pagination from 'components/pagination/Pagination';


const Posts = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const posts = useSelector((state: RootState) => state.posts.posts);
  const postPerPage = 5;
  const lastPage = Math.ceil(posts.length / postPerPage);
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  let currentPosts = posts.slice(firstPostIndex, lastPostIndex);
  useEffect(() => {
      currentPosts = posts.slice(firstPostIndex, lastPostIndex);
      console.log(posts)
      console.log(currentPosts)
  }, [posts])

  console.log(posts.length)

  return (
    <>
    <div className='posts_container'>
      {currentPosts.map(post => <SinglePost post={post} setImgUrl={setImgUrl}/>)}
    </div>
    <Pagination 
      currentPage={currentPage} 
      lastPage={lastPage} 
      maxLength={7} 
      setCurrentPage={setCurrentPage}
    />
    <div className='popup-media' style={{display: imgUrl ? 'block' : 'none'}}>
      <span className='close' onClick={() => setImgUrl('')}>&times;</span>
      <img src={imgUrl} alt="" />
    </div>
    </>
  )
}

export default Posts
