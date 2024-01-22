import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { CSSProperties } from 'react';
import { Post } from "../../types/Post";
import ProfileImage from '../profile-image/ProfileImage';

type PostItemProps = {
    post: Post;
    comments?: {
        show: boolean,
        onClick?: () => void;
    };
    maxHeight?: number;
    style?: CSSProperties;
}

function PostItem({ post, comments, maxHeight, style }: PostItemProps) {
    return <article className="post-item rounded-[20px] bg-white flex flex-col p-6 h-fit gap-3 drop-shadow-xl overflow-hidden" style={{ maxHeight, ...style }}>
        {
            post.image && <img
                src={post.image}
                className='h-[190px] w-full rounded-[20px] object-cover' />
        }
        <div className="flex gap-2">
            <ProfileImage src={post.ownerId.image} className='h-[50px] w-[50px] rounded-xl' />
            <div>
                <h3 className="font-bold text-lg">{post.ownerId.name}</h3>
                <div className='opacity-50 text-sm'>{post.ownerId.type}</div>
            </div>
        </div>
        <p
            className="opacity-60 overflow-hidden whitespace-pre-wrap">
            {post.content}
        </p>
        <div className="flex gap-3">
            {comments && comments.show &&
                <span onClick={comments.onClick} className="py-1 px-2 cursor-pointer bg-[lightgray] rounded-lg flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon width={22} height={22} className='opacity-70' />
                    <span className='text-[14px] opacity-70'>{post.commentsCount}</span>
                </span>}

        </div>
    </article >
}

export default PostItem;