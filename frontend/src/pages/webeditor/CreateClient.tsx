import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { toast } from "react-toastify";

const CreateClient = () => {
  const [joinDate, setJoinDate] = useState<string>("");
  const [clientName, setClientName] = useState<string>("");
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("");
  const maxDescriptionLength = 100;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType !== "image") {
        toast.error("Only image files are allowed");
        return;
      }
      setImage(file);
    }
  };

  const handleClientNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const handleJoinDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinDate(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxDescriptionLength) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      toast.error("Image file is required");
      return;
    }

    setDisable(true);

    const formData = new FormData();
    formData.append("companyLogo", image);
    formData.append("joinDate", joinDate);
    formData.append("clientName", clientName);
    formData.append("description", description);

    try {
      await axios.post("http://localhost:5000/api/clients", formData);
      toast.success("Client added successfully!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error("An error occurred while adding the client.");
      }
    }

    setDisable(false);
  };

  return (
    <div className="dark:bg-slate-900 p-4 mx-auto">
      {/* <ActiveSlider autoplayState={true} /> */}
      <h1 className="text-center font-bold text-3xl dark:text-white">
        Add Client
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-white shadow-lg shadow-gray-300 p-4 text-center items-center w-11/12 mx-auto dark:bg-slate-800 dark:shadow-gray-700"
      >
        <div className="pt-4">
          <label
            htmlFor="file-upload"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-200"
          >
            Upload Client Logo
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          />
        </div>

        <div className="pt-4 w-7/12">
          <label
            htmlFor="client-name"
            className="text-gray-700 font-semibold text-lg dark:text-gray-200"
          >
            Enter Client Name
          </label>
          <input
            id="client-name"
            type="text"
            value={clientName}
            onChange={handleClientNameChange}
            className="block w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <div className="pt-4 w-7/12">
          <label
            htmlFor="description"
            className="text-gray-700 font-semibold text-lg dark:text-gray-200"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={10}
            value={description}
            onChange={handleDescriptionChange}
            className="block mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {description.length}/{maxDescriptionLength} characters
          </p>
        </div>

        <div className="pt-8">
          <label
            htmlFor="joinDate"
            className="px-1 text-gray-700 font-semibold text-lg dark:text-gray-200"
          >
            Client Since:
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="joinDate"
            type="date"
            value={joinDate}
            onChange={handleJoinDateChange}
            required
            min="2021-01-01"
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue dark:focus:shadow-outline-blue"
            disabled={disable}
          >
            {disable ? (
              <CgSandClock size={30} className="text-gray-300" />
            ) : (
              "Add New Client"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;
