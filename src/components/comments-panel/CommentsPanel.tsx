import { useQuery } from 'react-query';
import { getComments } from '../../services/commentService';
import { Post } from '../../types/Post';
import PostItem from '../post-item/PostItem';
import Slider from '../slider/Slider';
import CommentItem from './comment-item/CommentItem';
import './CommentsPanel.css';

type CommentsPanelProps = {
    show: boolean;
    post: Post | undefined;
    onClose: () => void;
}

function CommentsPanel({ show, post, onClose }: CommentsPanelProps) {

    const { data } = useQuery(
        ['getPostComments', post?._id],
        () => getComments(post?._id),
        { enabled: !!post }
    );
    const comments = data?.data || [];

    return <Slider show={show} onClose={onClose} title={`${post?.ownerId.name}'s post`}>
        {post &&
            <div className='flex flex-col overflow-hidden flex-1'>
                <PostItem post={post} />
                <h2 className='font-bold mt-5'>Comments ({comments.length})</h2>
                <div className='comments flex flex-col gap-3 mt-5 flex-1 overflow-y-scroll'>
                    {comments.map(comment => (
                        <CommentItem key={comment._id} comment={comment} />
                    ))}
                </div>
                <div className='add-comment flex-0 add-comment pt-3 flex flex-col gap-4'>
                    <textarea placeholder='Add your comment..' className='h-[100px] resize-none'/>
                    <button className='w-full'>Add Comment</button>
                </div>
            </div>
        }
    </Slider>
}

export default CommentsPanel;