import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addComment, getComments } from '../../services/commentService';
import { Post } from '../../types/Post';
import PostItem from '../post-item/PostItem';
import Slider from '../shared/slider/Slider';
import CommentItem from './comment-item/CommentItem';
import { useRecoilValue } from 'recoil';
import { userIdSelector } from '../../store/atoms/userAtom';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { GET_ALL_POSTS, GET_POST_COMMENTS } from '../../query-keys/queries';
import classNames from 'classnames';
import './CommentsPanel.css';

type CommentsPanelProps = {
    show: boolean;
    post: Post | undefined;
    onClose: () => void;
}

function CommentsPanel({ show, post, onClose }: CommentsPanelProps) {
    const userId = useRecoilValue(userIdSelector);
    const queryClient = useQueryClient();

    const commentsWrapperRef = useRef<HTMLDivElement>(null);

    const [newCommentContent, setNewCommentContent] = useState("");

    const { data } = useQuery(
        [GET_POST_COMMENTS, post?._id],
        () => getComments(post?._id),
        { enabled: !!post }
    );
    const comments = data?.data || [];

    const addCommentMutation = useMutation(({ content }: { content: string }) =>
        addComment(userId, post?._id, content), {
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [GET_POST_COMMENTS] });
            queryClient.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
        }
    });

    const addNewComment = async () => {
        if (newCommentContent !== "") {
            try {
                await addCommentMutation.mutateAsync({ content: newCommentContent });
                toast.success('Comment added successfully');
                setNewCommentContent("");

                setTimeout(() => {
                    scrollToBottomOfComments();
                }, 500);
            } catch (err) {
                toast.error('Failed to add comment. Please try again');
            }
        }
    }

    const scrollToBottomOfComments = () => {
        const lastCommentElement = commentsWrapperRef.current?.lastElementChild?.lastElementChild;
        lastCommentElement?.scrollIntoView({ behavior: 'smooth' });
    }

    return <Slider show={show} onClose={onClose} title={`${post?.ownerId.name}'s post`}>
        {post &&
            <div className='flex flex-col overflow-hidden flex-1'>
                <div className='overflow-y-scroll flex-1' ref={commentsWrapperRef}>
                    <PostItem
                        post={post}
                        style={{ marginLeft: 10, marginRight: 10, flexShrink: 0 }}
                    />
                    <h2 className='font-bold mt-5'>Comments ({comments.length})</h2>
                    <div className='comments flex flex-col gap-3 mt-5 flex-1 overflow-y-scroll'>
                        {comments.map(comment => (
                            <CommentItem key={comment._id} comment={comment} />
                        ))}
                    </div>
                </div>
                <div className='add-comment flex-0 add-comment pt-3 flex flex-col gap-4'>
                    <textarea value={newCommentContent} 
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        placeholder='Add your comment..' 
                        className='h-[100px] resize-none' />
                    <button disabled={newCommentContent === "" || addCommentMutation.isLoading} className={classNames('w-full', newCommentContent === "" && 'opacity-60')} onClick={addNewComment}>Add Comment</button>
                </div>
            </div>
        }
    </Slider>
}

export default CommentsPanel;