import { useState } from 'react';
import Masonry from "react-masonry-css";
import { useQuery } from 'react-query';
import CommentsPanel from '../../components/comments-panel/CommentsPanel';
import PostItem from "../../components/post-item/PostItem";
import { getPosts } from '../../services/postService';
import { Post } from '../../types/Post';
import './Discover.css';
import { GET_ALL_POSTS } from '../../query-keys/queries';

function Discover() {
    const [selectedPost, setSelectedPost] = useState<Post>();
    const [showCommentsPanel, setShowCommentsPanel] = useState(false);

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
        <CommentsPanel show={showCommentsPanel} post={selectedPost} onClose={closeComments} />
    </>
}

export default Discover;