import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { PhotoIcon } from "@heroicons/react/24/outline";
import axios from "axios";

import NavBar from "../components/NavBar";

export default function NewPost() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);

    try {
      await axios.post("api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/");
    } catch (error) {
      console.error("Error creating post", error);
      alert("failed to upload post");
    }
  };

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <NavBar />
      <main className="max-w-lg mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 px-4 py-3 font-semibold text-center text-gray-900">
            Create new post
          </div>
          <form onSubmit={submit} className="flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-center items-center min-h-[300px] bg-gray-50 relative">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[400px] w-auto object-contain"
                />
              ) : (
                <div className="text-center flex flex-col items-center">
                  <PhotoIcon className="h-16 w-16 text-gray-400 mb-2" />
                  <span className="text-gray-500 text-sm font-medium">
                    Select an image to share
                  </span>
                </div>
              )}
              <input
                onChange={fileSelected}
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <img
                  className="h-8 w-8 rounded-full border border-gray-200 object-cover mt-1"
                  src="https://ui-avatars.com/api/?name=U&background=random"
                  alt="avatar"
                />
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption..."
                  className="w-full resize-none outline-none text-sm placeholder-gray-400 mt-1 h-20 bg-transparent"
                />
              </div>
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={!file}
                  className="bg-blue-500 text-white font-semibold py-1.5 px-4 rounded-md text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Share
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
