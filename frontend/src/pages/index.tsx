import { useState } from "react";
import { getPosts, Post } from "../server/posts";
import axios from "axios";

import SinglePost from "../components/SinglePost";
import NavBar from "../components/NavBar";

interface AppProps {
  posts: Post[];
}

function App(props: AppProps) {
  const [posts, setPosts] = useState<Post[]>(props.posts || []);

  const likeClicked = async ({ id }: { id: string | number }) => {
    console.log(`likeClicked = (${id})`);
  };
  const commentClicked = ({ id }: { id: string | number }) => {
    console.log(`commentClicked = (${id})`);
  };
  const deletePostClicked = async ({ id }: { id: string | number }) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post");
    }
  };

  const postActions = {
    likeClicked,
    commentClicked,
    deletePostClicked,
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <NavBar />
      <main className="max-w-4xl mx-auto pt-8 px-0 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col items-center">
          {posts.map((post) => (
            <SinglePost key={`post-${post.id}`} post={post} {...postActions} />
          ))}
          {posts.length === 0 && (
            <div className="text-center mt-20 flex flex-col items-center justify-center">
              <div className="h-24 w-24 border-2 border-gray-900 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-10 h-10 text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No Posts Yet
              </h2>
              <p className="text-gray-500 text-sm">
                Be the first to share a moment!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
