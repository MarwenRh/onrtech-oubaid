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
  const [imageName, setImageName] = useState("");

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

  const handleClientNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setClientName(e.target.value);
  };

  const handleJoinDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setJoinDate(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
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
    <div className="dark:bg-blue-950 p-4 rounded-md w-10/12 mx-auto">
      <h1 className="text-center font-bold text-3xl">Add Client</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between bg-white shadow-lg shadow-gray-300 p-4 text-center items-center"
      >
        <div className="pt-4">
          {/* 


*/}

          {/*  */}
          <label
            htmlFor="file-upload"
            className="text-white bg-sky-500 rounded-md hover:bg-sky-700 px-2 py-2 hover:cursor-pointer"
          >
            Upload Client Logo
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="pt-3 text-gray-500 text-lg">{imageName}</div>
        </div>

        <div className="pt-4">
          <label
            htmlFor="client-name"
            className="text-gray-700 font-semibold text-lg"
          >
            Enter Client Name
          </label>
          <input
            id="client-name"
            type="text"
            value={clientName}
            onChange={handleClientNameChange}
            className="block mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
            required
          />
        </div>

        <div className="pt-4">
          <label
            htmlFor="description"
            className="text-gray-700 font-semibold text-lg"
          >
            Description
          </label>
          <textarea
            id="description"
            cols={25}
            rows={20}
            value={description}
            onChange={handleDescriptionChange}
            className="block mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
            required
          />
        </div>

        <div className="pt-8">
          <label
            htmlFor="joinDate"
            className="px-1 text-gray-700 font-semibold text-lg"
          >
            Client Since:
          </label>
          <input
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-300"
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
            className="w-full px-6 py-2 text-lg text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
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
