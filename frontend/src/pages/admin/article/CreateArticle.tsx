import axios from "axios";
import { useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader } from "../../../components/loader/Loader";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import useRedirectOnlyAdminEditor from "../../../hooks/useRedirectOnlyAdminEditor";
import { useNavigate } from "react-router-dom";
import { CgSandClock } from "react-icons/cg";
import { RootState } from "../../../redux/store";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

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

const ArticleForm = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdminEditor("/profile");

  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [contentHtml, setContentHtml] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [tags, setTags] = useState<string>("");
  const [category, setCategory] = useState<string>("General");
  const [seoTitle, setSeoTitle] = useState<string>("");
  const [seoDescription, setSeoDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>();
  const [disable, setDisable] = useState(false);

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

  const PostData = async (data: FormData) => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/articles`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Article created successfully!");
      if (user?.role === "Admin") navigate("/ManageArticles");
      else navigate("/editorArticles");
    } catch (err) {
      toast.error("An error occurred while creating the article.");
    } finally {
      setLoading(false);
    }
  };

  const publihsed = user?.role === "Web Editor" ? "false" : "true";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisable(true);
    if (!image) {
      toast.error("Image file is required");
      setDisable(false);
      return;
    }
    if (!title.trim() || !contentHtml.trim()) {
      toast.error("Title and content are required");
      setDisable(false);
      return;
    }

    const formData = new FormData();
    formData.append("userId", user?._id || "");
    formData.append("title", title);
    formData.append("summary", summary);
    formData.append("contentHtml", contentHtml);
    formData.append("author", user?.name || "Author");
    if (user?.role === "Admin") {
      formData.append("publishedAt", new Date().toISOString());
    }
    formData.append("image", image);
    formData.append("published", publihsed);
    formData.append("tags", tags);
    formData.append("category", category);
    formData.append("seoTitle", seoTitle);
    formData.append("seoDescription", seoDescription);

    await PostData(formData);
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
        <div className="dark:bg-blue-950 p-4 rounded-md w-10/12 mx-auto">
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
              className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-blue-400 border border-blue-300 dark:bg-slate-800 dark:text-gray-100"
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
                    Upload Cover Image
                  </span>
                </label>
                <input id="file-upload" name="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </div>
              {imageName && (
                <p className="mt-2 dark:text-gray-300 text-gray-800 font-bold">{imageName}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
            >
              {disable ? <CgSandClock size={30} className="text-gray-300" /> : "Create Article"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ArticleForm;