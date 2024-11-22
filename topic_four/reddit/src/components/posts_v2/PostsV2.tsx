import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RootState } from 'store'
import SinglePost from '../post/Post';
import './style.css';
import Pagination from 'components/pagination/Pagination';
import SortMenu from 'components/sortMenu/SortMenu';
import { Post } from 'reducers/postsSlice';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';


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

async function fetchPosts(page: number, posts: Post[]) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return posts.slice((page - 1) * 3, page * 3);
}

const PostsV2 = () => {
  const [imgUrl, setImgUrl] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const posts = useSelector((state: RootState) => state.posts.posts);

  const LIMIT = 5;

  function fetchItems({ pageParam }: { pageParam: number }): Promise<{
    data: Post[];
    currentPage: number;
    nextPage: number | null;
  }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: posts.slice(pageParam, pageParam + LIMIT),
          currentPage: pageParam,
          nextPage: pageParam + LIMIT < posts.length ? pageParam + LIMIT : null,
        });
      }, 1000);
    });
  }

  const { data, error, status, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['items'],
      queryFn: fetchItems,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });


  const { ref, inView } = useInView();
  
  useEffect(() => {
    if(inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);
  
  return (
    <>
    <div className='posts-header'>
      <SortMenu filterOption={filterOption} setFilterOption={setFilterOption}/>
      <Link to="/" className='link'>Go to posts page with normal pagination</Link>
    </div>
    <div className='posts_container'>
      {status === 'pending' ? (
        <div>Loading...</div>
      ): status === 'error' ? (
        <div>{error.message}</div>
      ) : (
        <div>
          {data.pages.map((page) => (
            <div key={page.currentPage}>
              {page.data.map((post) => (
                <SinglePost post={post} setImgUrl={setImgUrl} key={post.id}/>
              ))}
            </div>
          ))}
          <div ref={ref}>{isFetchingNextPage && 'Loading...'}</div>
        </div>
      )}
    </div>
    <div className='popup-media' style={{display: imgUrl ? 'block' : 'none'}}>
      <span className='close' onClick={() => setImgUrl('')}>&times;</span>
      <img src={imgUrl} alt="" />
    </div>
    </>
  )
}

export default PostsV2
