import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { toast } from "react-toastify";
import { client } from "../../types/types";

const Clients = () => {
  const [joinDate, setJoinDate] = useState<string>("");
  const [disable, setDisable] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageName, setImageName] = useState("");
  const [clients, setClients] = useState<client[]>([]);
  useEffect(() => {
    const getClients = async () => {
      try {
        const resp = await axios.get("http://localhost:5000/api/clients");
        setClients(resp.data.Clients);
        console.log("clients", resp.data.Clients);
      } catch (error) {
        toast.error("We had a server problem");
      }
    };
    getClients();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setJoinDate(event.target.value);
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

    try {
      // setLoading(true);
      await axios.post("http://localhost:5000/api/clients", formData);
      // setLoading(false);
      toast.success("Article created successfully!");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error("An error occurred while creating the article.");
      }
    }

    setDisable(false);
  };

  return (
    <div className="dark:bg-blue-950">
      <div className="flex flex-row flex-wrap justify-evenly items-center">
        {clients?.map((client, index) => (
          <div key={index}>
            <img
              src={client.companyLogo}
              className="rounded-full w-8 h-8 shadow-md shadow-blue-100"
              alt="client"
            />
          </div>
        ))}
      </div>
      {/* list of clients */}
      <div className="p-4 w-full"></div>
      <div className="dark:bg-blue-950 p-4 rounded-md w-10/12 mx-auto">
        <h1 className="text-center font-bold text-3xl">Add Client</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-between bg-white shadow-lg shadow-gray-300 p-4 text-center items-center"
        >
          <div className="pt-4">
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

          <div className="pt-8">
            <label
              htmlFor="joinDate"
              className="px-1 text-gray-700 font-semibold text-lg"
            >
              Client Since:
            </label>
            <input
              className="px-1 py-1"
              id="joinDate"
              type="date"
              required
              min="2021-01-01"
              onChange={handleChange}
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
    </div>
  );
};

export default Clients;
