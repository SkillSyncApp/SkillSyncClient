import moment from 'moment';
import { useQuery } from 'react-query';
import { getComments } from '../../services/commentService';
import { Post } from '../../types/Post';
import PostItem from '../post-item/PostItem';
import ProfileImage from '../profile-image/ProfileImage';
import Slider from '../slider/Slider';
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

    const formattedDate = (date: string) => moment(date).format("DD/MM/YYYY hh:mm");

    return <Slider show={show} onClose={onClose} title={`${post?.ownerId.name}'s post`}>
        {post &&
            <>
                <PostItem post={post} />
                <h2 className='font-bold mt-5'>Comments ({comments.length})</h2>
                <div className='comments flex flex-col gap-3 mt-5'>
                    {comments.map(comment => (
                        <div key={comment._id} className="comment p-4 flex-col gap-3">
                            <div className='flex gap-3'>
                                <ProfileImage src={comment.userId.image} className='shadow-md h-[40px] w-[40px]' />
                                <div className='content flex flex-col'>
                                    <span className='font-bold'>{comment.userId.name}</span>
                                    <span className='time opacity-60 text-[14px]'>{formattedDate(comment.createdAt)}</span>
                                </div>
                            </div>
                            <p className='mt-4'>
                                {comment.content}
                            </p>
                        </div>
                    ))}
                </div>
            </>
        }
    </Slider>
}

export default CommentsPanel;