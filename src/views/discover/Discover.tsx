import { PlusIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import AddPostDialog from "../../components/add-post-dialog/AddPostDialog";
import EditPostDialog from "../../components/edit-post-dialog/EditPostDialog";
import CommentsPanel from "../../components/comments-panel/CommentsPanel";
import PostItem from "../../components/post-item/PostItem";
import { GET_ALL_POSTS } from "../../query-keys/queries";
import { deletePost, getPosts } from "../../services/postService";
import { userState } from "../../store/atoms/userAtom";
import { Post } from "../../types/Post";
import "./Discover.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import NoPostsAnimation from "./no-posts-animation.json";
import LoadingPostsAnimation from "./loading-posts-animation.json";

function Discover() {
  const user = useRecoilValue(userState);

  const queryClient = useQueryClient();

  const { data, isLoading: isPostsLoading } = useQuery(
    GET_ALL_POSTS,
    getPosts,
    { staleTime: Infinity }
  );
  const posts = data?.data || [];
  const navigate = useNavigate();

  useEffect(() => {
    if (user.type == "unknown" || user.bio == "")
      navigate("/logInGoogle", { replace: true });
  }, [user.type, user.bio]);

  const deletePostMutation = useMutation(
    (postId: Post["_id"]) => deletePost(postId),
    {
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: [GET_ALL_POSTS] });
      },
    }
  );

  const [showUsersPostsOnly, setShowUsersPostsOnly] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post>();
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [showAddPostDialog, setShowAddPostDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [editPostData, setEditPostData] = useState<Post | undefined>(undefined);

  const isBelongToCurrentUser = (post: Post) => {
    if (user && post.ownerId && user._id) {
      return post.ownerId._id === user._id;
    }
    return false;
  };
  const usersPosts = posts.filter(isBelongToCurrentUser);

  const displayedPosts = showUsersPostsOnly ? usersPosts : posts;

  const showComments = (post: Post) => {
    setSelectedPost(post);
    setShowCommentsPanel(true);
  };

  const closeComments = () => {
    setShowCommentsPanel(false);
    setTimeout(() => {
      setSelectedPost(undefined);
    }, 250);
  };

  const deleteUserPost = async (postId: Post["_id"]) => {
    try {
      await deletePostMutation.mutateAsync(postId);
      toast.success("Post has deleted successfully");
    } catch (err) {
      toast.error("Failed to delete post. Please try again");
    }
  };

  const editUserPost = (post: Post) => {
    setEditPostData(post); // Set the post data to be edited
    setShowEditPostDialog(true);
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="toolbar bg-white flex items-center p-5 shadow-lg z-10">
        <p className="mr-4 flex items-center gap-1">
          <FunnelIcon width={18} height={18} className="inline-block" />
          Filters
        </p>
        <button
          className={`px-4 py-2 bg-lightgray text-primary !shadow-none ${classNames(
            { "bg-primary text-white": showUsersPostsOnly }
          )}`}
          onClick={() => setShowUsersPostsOnly((prevValue) => !prevValue)}
        >
          my posts
        </button>
      </div>
      {displayedPosts.length > 0 && !isPostsLoading && (
        <Masonry
          breakpointCols={2}
          className="posts-grid flex-1 p-6"
          columnClassName="posts-grid-column"
        >
          {displayedPosts.map((post) => (
            <PostItem
              key={post._id}
              comments={{ show: true, onClick: () => showComments(post) }}
              post={post}
              style={{ maxHeight: 450 }}
              {...(isBelongToCurrentUser(post) && {
                onDelete: () => deleteUserPost(post._id),
                onEdit: () => editUserPost(post), // Added onEdit prop
              })}
            />
          ))}
        </Masonry>
      )}
      {displayedPosts.length === 0 && !isPostsLoading && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Lottie
            isClickToPauseDisabled
            options={{ animationData: NoPostsAnimation }}
            style={{ width: 400, height: 200 }}
          />
          <span className="mt-2 text-lg opacity-80 font-bold">
            Oops, not results
          </span>
          <span className="opacity-50">you haven't posted anything yet</span>
        </div>
      )}
      {isPostsLoading && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <Lottie
            isClickToPauseDisabled
            options={{ animationData: LoadingPostsAnimation }}
            style={{ width: 400, height: 200 }}
          />
          {/* <span className="mt-2 text-lg opacity-80 font-bold">Gathering posts...</span> */}
        </div>
      )}
      <div
        className="group absolute z-20 bottom-[50px] right-[50px]"
        onClick={() => setShowAddPostDialog(true)}
      >
        <button className="py-2 px-3 flex items-center group-hover:-translate-y-1 transition-all">
          <PlusIcon className="mr-1 w-[16px] h-[16px]" />
          Add post
        </button>
      </div>
      <CommentsPanel
        show={showCommentsPanel}
        post={selectedPost}
        onClose={closeComments}
      />
      {showAddPostDialog && (
        <AddPostDialog
          show={showAddPostDialog}
          onClose={() => setShowAddPostDialog(false)}
        />
      )}
      {showEditPostDialog &&
        editPostData && ( // Added condition for showing edit dialog
          <EditPostDialog
            show={showEditPostDialog}
            onClose={() => setShowEditPostDialog(false)}
            post={editPostData}
          />
        )}
    </div>
  );
}

export default Discover;
