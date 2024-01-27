import { useState } from "react";
import Dialog from "../shared/dialog/Dialog";
import { useMutation, useQueryClient } from "react-query";
import { CreatePostInput } from "../../types/Post";
import { addPost } from "../../services/postService";
import toast from "react-hot-toast";
import { GET_ALL_POSTS } from "../../query-keys/queries";

type AddPostDialogProps = {
    show: boolean;
    onClose: () => void;
}

function AddPostDialog({ show, onClose }: AddPostDialogProps) {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const addPostMutation = useMutation((post: CreatePostInput) =>
        addPost(post), {
            onSettled: () => {
                queryClient.invalidateQueries(GET_ALL_POSTS);
            }
    });

    const add = async () => {
        try {
            await addPostMutation.mutateAsync({ title, content });
            toast.success('Great! your new post is up');
            onClose();
        } catch (err) {
            toast.error('Failed to add post');
        }
    }

    return <Dialog show={show} onClose={onClose} title='Add Post'>
        <div className="flex flex-col gap-3 pt-5">
            <div>
                <label htmlFor="title" className="block mb-2 text-sm text-gray-700">Title</label>
                <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label htmlFor="content" className="block mb-2 text-sm text-gray-700">Content</label>
                <textarea rows={4} id="content" value={content} onChange={(e) => setContent(e.target.value)} className="resize-none"/>
            </div>
            <button onClick={add}>Done</button>
        </div>
    </Dialog>
}

export default AddPostDialog;