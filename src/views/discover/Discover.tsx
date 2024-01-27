import { useState } from 'react';
import Masonry from "react-masonry-css";
import { useQuery } from 'react-query';
import CommentsPanel from '../../components/comments-panel/CommentsPanel';
import PostItem from "../../components/post-item/PostItem";
import { getPosts } from '../../services/postService';
import { Post } from '../../types/Post';
import { GET_ALL_POSTS } from '../../query-keys/queries';
import { PlusIcon } from '@heroicons/react/24/solid';
import AddPostDialog from '../../components/add-post-dialog/AddPostDialog';
import './Discover.css';

function Discover() {
    const [selectedPost, setSelectedPost] = useState<Post>();
    const [showCommentsPanel, setShowCommentsPanel] = useState(false);
    const [showAddPostDialog, setShowAddPostDialog] = useState(false);

    const { data } = useQuery(GET_ALL_POSTS, getPosts, { staleTime: Infinity });
    const posts = data?.data || [];

    const showComments = (post: Post) => {
        setSelectedPost(post);
        setShowCommentsPanel(true);
    };

    const closeComments = () => {
        setShowCommentsPanel(false);
        setTimeout(() => {
            setSelectedPost(undefined);
        }, 250);
    }

    return <>
        <Masonry breakpointCols={2}
            className="posts-grid flex-1 p-6"
            columnClassName="posts-grid-column">
            {posts.map(post => (
                <PostItem
                    key={post._id}
                    comments={{ show: true, onClick: () => showComments(post) }}
                    post={post}
                    style={{ maxHeight: 450 }}
                />
            ))}
        </Masonry>
        <div className='group absolute z-20 bottom-[50px] right-[50px]' onClick={() => setShowAddPostDialog(true)}>
            <button className='py-2 px-3 flex items-center group-hover:-translate-y-1 transition-all'>
                <PlusIcon className='mr-1 w-[16px] h-[16px]' />Add post
            </button>
        </div>
        <CommentsPanel show={showCommentsPanel} post={selectedPost} onClose={closeComments} />
        {showAddPostDialog && <AddPostDialog show={showAddPostDialog} onClose={() => setShowAddPostDialog(false)}/>}
    </>
}

export default Discover;