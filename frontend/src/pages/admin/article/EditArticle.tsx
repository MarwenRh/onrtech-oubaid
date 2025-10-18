import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../../components/loader/Loader";
import { toast } from "react-toastify";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const EditArticle = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [contentHtml, setContentHtml] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [seoTitle, setSeoTitle] = useState<string>("");
  const [seoDescription, setSeoDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;
  const { id } = useParams();

  // (Paste HTML button removed; auto-paste handling remains)

  // Convert raw HTML pasted directly into the editor into formatted content
  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const root = quill.root as HTMLElement;
    const onPaste = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      const text = e.clipboardData.getData("text/plain");
      const looksLikeHtml = /<\s*\w+[^>]*>/i.test(text);
      if (looksLikeHtml) {
        e.preventDefault();
        const index = (quill.getSelection()?.index ?? quill.getLength());
        quill.clipboard.dangerouslyPasteHTML(index, text);
      }
    };
    root.addEventListener("paste", onPaste as unknown as EventListener);
    return () => {
      root.removeEventListener("paste", onPaste as unknown as EventListener);
    };
  }, [quillRef.current]);

  useEffect(() => {
    const getArticleDetails = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/articles/${id}`);
        const a = resp.data;
        setTitle(a.title);
        setSummary(a.summary || "");
        setContentHtml(a.contentHtml || "");
        setImageName(a.image || "");
        setTags(Array.isArray(a.tags) ? a.tags.join(", ") : "");
        setCategory(a.category || "General");
        setSeoTitle(a.seoTitle || "");
        setSeoDescription(a.seoDescription || "");
        setLoading(false);
      } catch (error) {
        toast.error("Failed to load article");
      }
    };
    getArticleDetails();
  }, [id]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("contentHtml", contentHtml);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("seoTitle", seoTitle);
    formData.append("seoDescription", seoDescription);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`${BACKEND_URL}/articles/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Article updated successfully!");
      if (user?.role === "Admin") navigate("/ManageArticles");
      else navigate("/editorArticles");
    } catch (error) {
      toast.error("Sorry we hit an error try again !");
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
                  className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-blue-400 border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                />
                <input
                  type="text"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Short summary (max 400 chars)"
                  maxLength={400}
                  className="w-full px-3 py-2 rounded-md border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                />

                <ReactQuill
                  ref={quillRef}
                  value={contentHtml}
                  onChange={setContentHtml}
                  modules={modules}
                  theme="snow"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="Tags (comma separated)"
                    className="w-full px-3 py-2 rounded-md border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Category"
                    className="w-full px-3 py-2 rounded-md border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="SEO Title"
                    className="w-full px-3 py-2 rounded-md border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                  />
                  <input
                    type="text"
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="SEO Description (max 160)"
                    maxLength={160}
                    className="w-full px-3 py-2 rounded-md border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
                  />
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <span className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Upload New Cover Image
                      </span>
                    </label>
                    <input id="file-upload" type="file" onChange={handleImageChange} className="hidden" />
                  </div>
                  {imageName && (
                    <p className="mt-2 text-gray-800 dark:text-gray-300 font-bold">{imageName}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
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