import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from "react-redux";

import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useNavigate } from "react-router-dom";
import { CgSandClock } from "react-icons/cg";
import { RootState } from "../../../redux/store";

const ArticleForm = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState<boolean>();
  const [disable, setDisable] = useState(false);

  const PostData = async (data: FormData) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/articles", data);
      setLoading(false);
      toast.success("Article created successfully!");
      if (user?.role === "Admin") {
        navigate("/ManageArticles");
      } else {
        navigate("/editorArticles");
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error("An error occurred while creating the article.");
      }
    }
  };
  let publihsed;
  if (user?.role === "Web Editor") {
    publihsed = "false";
  } else {
    publihsed = "true";
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setDisable(true);
    e.preventDefault();

    if (!image) {
      toast.error("Image file is required");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?._id);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("author", user.name);
    if (user?.role === "Admin") {
      formData.append("publishedAt", new Date().toISOString());
    }

    formData.append("image", image);
    formData.append("published", publihsed); // Set the published field to true

    PostData(formData);
    setDisable(false);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        toast.error("Only image files are allowed");
        return;
      }
      setImage(file);
      setImageName(file.name);
    }
  };

  return (
    <div className="dark:bg-slate-900 p-2">
      {loading ? (
        <Loader />
      ) : (
        <div className="dark:bg-blue-950 p-4 rounded-md  w-10/12 mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-blue-400  border
            border-blue-300 dark:bg-slate-800 dark:text-gray-100"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              cols={40}
              rows={20}
              placeholder="Content"
              required
              className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md   focus:outline-blue-400  border
            border-blue-300 dark:bg-slate-800 dark:text-gray-100"
            />

            {/* <div>
              <label>Content:</label>
              <ReactQuill value={content} onChange={setContent} />
            </div> */}
            {/* <ReactQuill
              value={content}
              onChange={(e) => setContent(e.target.value)}
            /> */}
            <div>
              <div className="flex items-center space-x-2">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <span className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Upload Image
                  </span>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                  required
                  className="hidden"
                />
              </div>
              {imageName && (
                <p className="mt-2 dark:text-gray-300 text-gray-800 font-bold">
                  {imageName}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
            >
              {disable ? (
                <CgSandClock size={30} className="text-gray-300" />
              ) : (
                "Create Article"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArticleForm;
