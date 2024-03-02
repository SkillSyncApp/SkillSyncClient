import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { updatePost } from "../../services/postService";
import { Post } from "../../types/Post";
import Dialog from "../shared/dialog/Dialog";
import ButtonGenerateContentAI from "../shared/button-generate-ai/ButtonGenerateContentAI"
import { uploadImage } from "../../services/fileUploadService";
import { GET_ALL_POSTS } from "../../query-keys/queries";

type EditPostDialogProps = {
  show: boolean;
  onClose: () => void;
  post: Post; // Pass the post data to the dialog
};

function EditPostDialog({ show, onClose, post }: EditPostDialogProps) {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image || ""); // If no image, default to empty string

  const updatePostMutation = useMutation((updatedPost: Partial<Post>) =>
    updatePost(post._id, updatedPost), {
      onSettled: () => {
        queryClient.invalidateQueries(GET_ALL_POSTS);
      }
  });

  const updatePostData = async () => {
    try {
      await updatePostMutation.mutateAsync({ title, content, image });
      toast.success("Post updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  const handleUpdateImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];
    if (selectedImage) {
      const image = await uploadImage(selectedImage);
      setImage(image.data.url)
    }
  };

  return (
    <Dialog show={show} onClose={onClose} title="Edit Post">
      <div className="flex flex-col gap-3 pt-5">
        <div>
          <label htmlFor="title" className="block mb-2 text-sm text-gray-700">
            Title
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
              <label htmlFor="content" className="block mb-2 text-sm text-gray-700">
                  Content
              </label>
              <ButtonGenerateContentAI title = {title} setContent={setContent}/>
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
          <input id="image" accept=".png, .jpg, .jpeg, .svg" type="file" onChange={handleUpdateImageChange} /> {/* TODO show image path url for the first time */}
        </div>
        <button onClick={updatePostData}>Update</button>
      </div>
    </Dialog>
  );
}

export default EditPostDialog;
