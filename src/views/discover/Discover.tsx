import { useState } from 'react';
import Masonry from "react-masonry-css";
import CommentsPanel from '../../components/comments-panel/CommentsPanel';
import PostItem from "../../components/post-item/PostItem";
import './Discover.css';

function Discover() {
    const [showCommentsPanel, setShowCommentsPanel] = useState(false);

    const showComments = (postId: string) => {
        setShowCommentsPanel(true);
    };

    return <>
        <Masonry breakpointCols={2}
            className="posts-grid flex-1 p-6"
            columnClassName="posts-grid-column">
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapien nec sagittis. Tellus orci ac auctor augue mauris augue neque. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapievarius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapien nec sagittis. Tellus orci ac auctor augue mauris augue neque. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapien nec sagittis. Tellre quam viverra orci sagittis eu volutpat odio facilisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "slisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapien nec sagittis. Tellus orci ac auctor augue mauris augue neque. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
            <PostItem onCommentClick={() => showComments('123')} post={{ content: "sapien nec sagittis. Tellus orci ac auctor augue mauris augue neque. Ornare quam viverra orci sagittis eu volutpat odio facilisis mauris. Mauris augue neque gravida in fermentum. Netus et malesuada fames ac turpis egestas maecenas pharetra. Quisque non tellus orci ac. Nunc lobortis mattis aliquam faucibus. Nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur. Enim nulla aliquet porttitor lacus luctus. Erat imperdiet sed euismod nisi. Iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Amet risus nullam eget felis eget nunc lobortis. Urna id volutpat lacus laoreet non curabitur gravida. Consequat interdum varius sit amet. Nunc lobortis mattis aliquam faucibus purus." }} />
        </Masonry>
        <CommentsPanel show={showCommentsPanel} onClose={() => setShowCommentsPanel(false)} />
    </>
}

export default Discover;