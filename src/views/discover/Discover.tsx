import { PlusIcon } from "@heroicons/react/24/solid";
import { FunnelIcon } from "@heroicons/react/24/outline";
import classNames from "classnames";
import { useState, useEffect, useMemo } from "react";
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

enum Filter {
  MINE = 'MINE',
  COMPANIES = 'COMPANIES',
  STUDENTS = 'STUDENTS',
}

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

  const [selectedPost, setSelectedPost] = useState<Post>();
  const [showCommentsPanel, setShowCommentsPanel] = useState(false);
  const [showAddPostDialog, setShowAddPostDialog] = useState(false);
  const [showEditPostDialog, setShowEditPostDialog] = useState(false);
  const [editPostData, setEditPostData] = useState<Post | undefined>(undefined);
  const [selectedFilter, setSelectedFilter] = useState<Filter | undefined>(undefined);

  const isBelongToCurrentUser = (post: Post) => {
    if (user && post.ownerId && user._id) {
      return post.ownerId._id === user._id;
    }
    return false;
  };

  const displayedPosts = useMemo(() => {
    if (!selectedFilter) {
      return posts;
    }

    switch (selectedFilter) {
      case Filter.COMPANIES:
        return posts.filter(post => post.ownerId.type === 'company');

      case Filter.MINE:
        return posts.filter(isBelongToCurrentUser);

      case Filter.STUDENTS:
        return posts.filter(post => post.ownerId.type === 'student');

      default:
        return posts;
    }
  }, [selectedFilter, posts]);

  const sortedPosts = [...displayedPosts].reverse();

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

  const selectFilter = (filter: Filter | undefined) => {
    if (selectedFilter === filter) {
      setSelectedFilter(undefined);
    }
    else {
      setSelectedFilter(filter);
    }
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="toolbar bg-white flex items-center p-5 shadow-lg z-10 gap-4">
        <p className="mr-4 flex items-center gap-">
          <FunnelIcon width={18} height={18} className="inline-block" />
          Filters
        </p>
        <button
          className={`px-4 py-2 bg-lightgray text-primary !shadow-none ${classNames(
            { "bg-primary text-white": selectedFilter === Filter.MINE }
          )}`}
          onClick={() => selectFilter(Filter.MINE)}
        >
          My Posts
        </button>
        {user.type === 'company' &&
          <button
            className={`px-4 py-2 bg-lightgray text-primary !shadow-none ${classNames(
              { "bg-primary text-white": selectedFilter === Filter.STUDENTS }
            )}`}
            onClick={() => selectFilter(Filter.STUDENTS)}
          >
            Students' Posts
          </button>
        }
        {user.type === 'student' &&
          <button
            className={`px-4 py-2 bg-lightgray text-primary !shadow-none ${classNames(
              { "bg-primary text-white": selectedFilter === Filter.COMPANIES }
            )}`}
            onClick={() => selectFilter(Filter.COMPANIES)}
          >
            Companies' Posts
          </button>
        }
      </div>
      {sortedPosts.length > 0 && !isPostsLoading && (
        <Masonry
          breakpointCols={2}
          className="posts-grid flex-1 p-6"
          columnClassName="posts-grid-column"
        >
          {sortedPosts.map((post) => (
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
      {sortedPosts.length === 0 && !isPostsLoading && (
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
        editPostData && ( 
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
