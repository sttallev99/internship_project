import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store'
import SinglePost from '../post/Post';
import './style.css';
import Pagination from 'components/pagination/Pagination';
import SortMenu from 'components/sortMenu/SortMenu';
import { Post } from 'reducers/postsSlice';
import { Link } from 'react-router-dom';

function filterData(posts:Post[], option: string): Post[] {
  const currTime = new Date().getTime();
  switch(option) {
    case 'all': 
      return posts
    case 'today':
      return posts.filter(p => currTime - p.post_date <= 86400000)
    case 'this week':
      return posts.filter(p => currTime - p.post_date <= 604800000)
    case 'this month':
      return posts.filter(p => currTime - p.post_date <= 2629743000)
    default:
      return posts
  }
}

const Posts = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0)
  const [filterOption, setFilterOption] = useState('');
  const [currentPosts, setCurrentPosts] = useState<Post[]>([])

  let posts = useSelector((state: RootState) => state.posts.posts);

  
  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  useEffect(() => {
      const data = filterData(posts, filterOption);
      setLastPage(Math.ceil(data.length / postPerPage));
      setCurrentPosts(data.slice(firstPostIndex, lastPostIndex))
  }, [posts, filterOption, currentPage]);

  return (
    <>
    <div className='posts-header'>
      <SortMenu filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Link to="/posts-v2" className='link'>Go to posts page with infinite scroll</Link>
    </div>
    <div className='posts_container'>
      {currentPosts.map(post => <SinglePost post={post} filterOption={filterOption} setImgUrl={setImgUrl}/>)}
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
