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
    return <article className="post-item rounded-[20px] bg-white flex flex-col p-5 h-fit gap-2 drop-shadow-xl overflow-hidden" style={{ maxHeight, ...style }}>
        {
            post.image &&
            <div className='overflow-hidden group h-[180px] rounded-[8px] mb-3 flex-shrink-0'>
                <img
                    src={post.image}
                    className='w-full h-full object-cover group-hover:scale-125 transition-all' />
            </div>

        }
        <div className="flex gap-2">
            <ProfileImage src={post.ownerId.image} className='h-[50px] w-[50px] rounded-xl' />
            <div>
                <h3 className="font-bold text-lg">{post.ownerId.name}</h3>
                <div className='opacity-50 text-sm'>{post.ownerId.type}</div>
            </div>
        </div>
        <h2 className='font-bold'>{post.title}</h2>
        <p
            className="opacity-60 overflow-hidden whitespace-pre-wrap">
            {post.content}
        </p>
        <div className="flex gap-3 group w-fit cursor-pointer mt-2">
            {comments && comments.show &&
                <span onClick={comments.onClick} className="py-1 px-2 bg-[lightgray] rounded-lg flex items-center gap-2 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:brightness-90 transition-all">
                    <ChatBubbleBottomCenterTextIcon width={22} height={22} className='opacity-70' />
                    <span className='text-[14px] opacity-70'>{post.commentsCount}</span>
                </span>}

        </div>
    </article >
}

export default PostItem;