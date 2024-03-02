import { Comment } from "../../../types/Comment"
import { formattedDate } from "../../../utils/dates";
import ProfileImage from "../../profile-image/ProfileImage";
import UserOverview from "../../user-overview/UserOverview";

type CommentItemProps = {
    comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
    return <div className="comment p-4 flex-col gap-3">
        <div className='flex gap-3'>
            <ProfileImage src={comment.userId.image} className='shadow-md h-[40px] w-[40px]' />
            <div className='content flex flex-col'>
                <UserOverview id={comment.userId._id} name={comment.userId.name} />
                <span className='time opacity-60 text-[14px]'>{formattedDate(comment.createdAt)}</span>
            </div>
        </div>
        <p className='mt-4'>
            {comment.content}
        </p>
    </div>
}

export default CommentItem;