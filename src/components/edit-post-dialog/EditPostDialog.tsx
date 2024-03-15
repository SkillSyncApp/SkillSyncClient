import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import { uploadImage } from "../../services/fileUploadService";
import { updatePost } from "../../services/postService";
import { Post } from "../../types/Post";
import ButtonGenerateContentAI from "../shared/button-generate-ai/ButtonGenerateContentAI";
import Dialog from "../shared/dialog/Dialog";

import "./EditPostDialog.css";

type EditPostDialogProps = {
  show: boolean;
  onClose: () => void;
  post: Post; // Pass the post data to the dialog
};

function EditPostDialog({ show, onClose, post }: EditPostDialogProps) {
  const queryClient = useQueryClient();
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [image, setImage] = useState(post.image);

  const updatePostMutation = useMutation(
    (updatedPost: Partial<Post>) => updatePost(post._id, updatedPost),
    {
      onSettled: () => {
        queryClient.invalidateQueries(GET_ALL_POSTS);
      },
    }
  );

  useEffect(() => {
    if (post.image) {
      setImage(post.image);
    }
  }, [post.image]);

  const updatePostData = async () => {
    try {
      if (!title.trim() || !content.trim()) {
        toast.error("Title and content must not be empty");
        return;
      }

      await updatePostMutation.mutateAsync({ title, content, image });
      toast.success("Post updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  const handleUpdateImageChange = async () => {
    // Trigger the file input click event when the button is clicked
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0];

    const maxSize = 10 * 1024 * 1024; // 10MB - adjust as needed
    if (selectedImage?.size && selectedImage.size > maxSize) {
      toast.error("Selected image exceeds the maximum file size allowed.");
      return;
    }

    if (selectedImage) {
      const image = await uploadImage(selectedImage);
      setImage(image?.data);
    }
  };

  function truncateMiddle(str: string, maxLength: number) {
    if (str.length <= maxLength) {
      return str;
    }

    const startLength = Math.ceil((maxLength - 3) / 2);
    const endLength = Math.floor((maxLength - 3) / 2);
    return (
      str.substring(0, startLength) + "..." + str.substring(str.length - endLength)
    );
  }

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
              <label
                htmlFor="content"
                className="block mb-2 text-sm text-gray-700"
              >
                Content
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
          <div className="flex items-center gap-2">
            <label
              htmlFor="image"
              className="input_image cursor-pointer rounded-sm"
            >
              <button
                className="btn_upload_image"
                onClick={handleUpdateImageChange}
              >
                Choose File
              </button>
              <span className="text-base ml-1">
                {truncateMiddle(image?.originalName || "No file chosen", 35)}
              </span>
              <input
                id="image"
                type="file"
                ref={inputFileRef}
                accept=".png, .jpg, .jpeg, .svg"
                onChange={handleFileInputChange}
                className="hidden" // Hide the file input visually
              />
            </label>
          </div>
        </div>
        <button onClick={updatePostData}>Update</button>
      </div>
    </Dialog>
  );
}

export default EditPostDialog;
