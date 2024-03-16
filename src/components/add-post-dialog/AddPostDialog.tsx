import { useState } from "react";
import Dialog from "../shared/dialog/Dialog";
import { useMutation, useQueryClient } from "react-query";
import { CreatePostInput } from "../../types/Post";
import { addPost } from "../../services/postService";
import { uploadImage } from "../../services/fileUploadService";
import toast from "react-hot-toast";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import ButtonGenerateContentAI from "../shared/button-generate-ai/ButtonGenerateContentAI";

type AddPostDialogProps = {
    show: boolean;
    onClose: () => void;
};

function AddPostDialog({ show, onClose }: AddPostDialogProps) {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const uploadFile = async ({ target }: { target: HTMLInputElement }) => {
        if (target.files?.length) {
            const [file] = target.files;

            const maxSize = 10 * 1024 * 1024; // 10MB - adjust as needed
            if (file.size > maxSize) {
                toast.error("Selected image exceeds the maximum file size allowed.");
                return;
            }

            await uploadImage(file);
        }
    };

    const addPostMutation = useMutation(
        (post: CreatePostInput) => addPost(post),
        {
            onSettled: () => {
                queryClient.invalidateQueries(GET_ALL_POSTS);
            },
        }
    );

    const add = async () => {
        try {
            await addPostMutation.mutateAsync({ title, content });
            toast.success("Great! your new post is up");
            onClose();
        } catch (err) {
            toast.error("Failed to add post");
        }
    };

    return (
        <Dialog show={show} onClose={onClose} title="Add Post">
            <div className="flex flex-col gap-3 pt-5">
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm text-gray-700">
                        Title
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <div className="flex flex-col items-start gap-4 mb-2">
                        <div className="flex flex-row items-center gap-4">
                            <label htmlFor="content" className="block text-sm text-gray-700">
                                Content
                                <span className="text-red-500">*</span>
                            </label>
                            <ButtonGenerateContentAI title={title} setContent={setContent} />
                        </div>
                    </div>
                    <textarea
                        rows={4}
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="resize-none"
                    />
                </div>
                <div>
                    <label htmlFor="image" className="block mb-2 text-sm text-gray-700">
                        Image (optional)
                    </label>
                    <input
                        id="image"
                        accept=".png, .jpg, .jpeg, .svg"
                        name="file"
                        type="file"
                        onChange={uploadFile}
                    />
                </div>
                <button onClick={add} className="mt-4">
                    Done
                </button>
            </div>
        </Dialog>
    );
}

export default AddPostDialog;
