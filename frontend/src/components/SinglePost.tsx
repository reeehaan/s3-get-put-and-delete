import {
  HeartIcon as HeartOutline,
  ChatBubbleOvalLeftIcon as ChatOutline,
  PaperAirplaneIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid, TrashIcon } from "@heroicons/react/24/solid";
import type { Post } from "../server/posts";

interface SinglePostProps {
  post: Post;
  likeClicked: (params: { id: string | number }) => void;
  commentClicked: (params: { id: string | number }) => void;
  deletePostClicked: (params: { id: string | number }) => void;
}

export default function SinglePost({
  post,
  likeClicked,
  commentClicked,
  deletePostClicked,
}: SinglePostProps) {
  const { id, caption, imageUrl, totalComments, totalLikes, created } = post;
  const isLiked = false; // Placeholder for actual like status

  return (
    <div className="bg-white border border-gray-200 sm:rounded-lg mb-6 w-full max-w-[470px] mx-auto pb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
            <div className="bg-white rounded-full p-[1px] h-full w-full">
              <img
                className="rounded-full h-full w-full object-cover"
                src="https://ui-avatars.com/api/?name=U&background=random"
                alt="User Avatar"
              />
            </div>
          </div>
          <span className="font-semibold text-sm">rehan_hansaja</span>
        </div>
        <button
          onClick={() => deletePostClicked({ id })}
          className="text-gray-400 hover:text-red-500 transition-colors"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Post Image */}
      <div className="bg-black flex justify-center items-center overflow-hidden aspect-[4/5] sm:aspect-square relative w-full">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={caption}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => likeClicked({ id })}
              className="hover:opacity-60 transition-opacity"
            >
              {isLiked ? (
                <HeartSolid className="h-7 w-7 text-red-500" />
              ) : (
                <HeartOutline className="h-7 w-7 text-gray-900" />
              )}
            </button>
            <button
              onClick={() => commentClicked({ id })}
              className="hover:opacity-60 transition-opacity"
            >
              <ChatOutline className="h-7 w-7 text-gray-900" />
            </button>
            <button className="hover:opacity-60 transition-opacity">
              <PaperAirplaneIcon
                className="h-7 w-7 text-gray-900 -rotate-45"
                style={{ marginTop: "-4px" }}
              />
            </button>
          </div>
          <button className="hover:opacity-60 transition-opacity">
            <BookmarkIcon className="h-7 w-7 text-gray-900" />
          </button>
        </div>

        {/* Likes */}
        <p className="font-semibold text-sm mb-1">{totalLikes} likes</p>

        {/* Caption */}
        <p className="text-sm">
          <span className="font-semibold mr-2">rehan_hansaja</span>
          {caption}
        </p>

        {/* Comments */}
        {totalComments > 0 ? (
          <button className="text-gray-500 text-sm mt-1">
            View all {totalComments} comments
          </button>
        ) : (
          <p className="text-gray-500 text-sm mt-1">No comments yet</p>
        )}

        {/* Date */}
        <p className="text-[10px] text-gray-400 uppercase tracking-wide mt-1">
          {new Date(created).toLocaleDateString("en-US")}
        </p>
      </div>
    </div>
  );
}
