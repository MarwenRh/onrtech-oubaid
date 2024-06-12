import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const EditArticle = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    const getArticleDetails = async () => {
      try {
        const resp = await axios.get(
          `http://localhost:5000/api/articles/${id}`
        );
        if (resp) {
          console.log(resp.data);
          setTitle(resp.data.title);
          setContent(resp.data.content);
          setImageName(resp.data.image); // Store image URL to display it
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        alert("An error occurred. Please check the console.");
      }
    };
    getArticleDetails();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image) {
      formData.append("image", image);
    }
    try {
      await axios.put(`http://localhost:5000/api/articles/${id}`, formData);

      toast.success("Article updated successfully!");
      if (user?.role === "Admin") {
        navigate("/ManageArticles");
      } else {
        navigate("/editorArticles");
      }
    } catch (error) {
      toast.error("Sorry we hit an error try again !");
      console.log(error);
    }
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
      <div>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <div className="bg-sky-50 p-4 rounded-md m-2 w-10/12 mx-auto dark:bg-blue-950">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  required
                  className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-blue-400  border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  cols={40}
                  rows={20}
                  placeholder="Content"
                  required
                  className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-blue-400 border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                />
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
                      className="hidden"
                    />
                  </div>
                  {/* {imageName && (
                    <p className="mt-2 text-gray-800 font-bold">{imageName}</p>
                  )} */}
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                >
                  Update Article
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditArticle;
