import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid';
import { Post } from "../../types/Post";

type PostItemProps = {
    post: Post;
}

function PostItem({ post }: PostItemProps) {

    return <article className="rounded-[20px] bg-white flex flex-col p-6 h-fit gap-3 drop-shadow-xl">
        <img
            src="https://mir-s3-cdn-cf.behance.net/project_modules/max_3840/620731182528277.652f6b6a0ea18.jpg"
            className='h-[190px] w-full rounded-[20px] object-cover' />
        <div className="flex gap-2">
            <img src="https://s3-symbol-logo.tradingview.com/amazon--600.png" className="h-[50px] w-[50px] rounded-xl" />
            <div>
                <h3 className="font-bold text-lg">Amazon Inc.</h3>
                <div className='opacity-50 text-sm'>Tech Company</div>
            </div>
        </div>
        <p className="opacity-60">{post.content}</p>
        <div className="flex gap-3">
            <span className="py-1 px-2 cursor-pointer bg-[lightgray] rounded-lg flex items-center gap-2">
                <ChatBubbleBottomCenterTextIcon width={22} height={22} className='opacity-70' />
                <span className='text-[14px] opacity-70'>140</span>
            </span>
        </div>
    </article>
}

export default PostItem;