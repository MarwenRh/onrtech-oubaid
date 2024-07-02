import { ChangeEvent, useEffect, useState } from "react";
import useRedirectLoggedOutUser from "../../hooks/userRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getUser, updateUser } from "../../redux/features/auth/authSlice";
import { Loader } from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { User } from "../../types/types";
import { extractFirstName } from "../../utils/extractName";

const Profile = () => {
  useRedirectLoggedOutUser("/");
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { isLoading, user } = useSelector((state: RootState) => state.auth);

  const initProfile: User = {
    _id: user?._id || "",
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    bio: user?.bio || "",
    photo: user?.photo || "",
    role: user?.role || "",
    jobTitle: user?.jobTitle || "",
  };

  const [profile, setProfile] = useState<User>(initProfile);

  useEffect(() => {
    if (user) {
      const initProfile: User = {
        _id: user?._id,
        name: user?.name,
        email: user?.email,
        phone: user?.phone,
        bio: user?.bio,
        photo: user?.photo,
        role: user?.role,
        jobTitle: user?.jobTitle,
      };
      setProfile(initProfile);
    }
  }, [user]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const saveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userData = {
        name: profile.name,
        phone: profile.phone,
        bio: profile.bio,
        jobTitle: profile.jobTitle,
      };
      await dispatch(updateUser(userData));
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className="bg-gray-50 py-10 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800  dark:text-gray-100 text-center">
              Welcome {profile?.name}
            </h2>
            <div className="flex justify-center items-center">
              {/* Profile component */}
              <div className="bg-white shadow-lg rounded-lg w-[450px] mx-auto my-8 md:w-[550px] dark:bg-slate-800 dark:shadow-gray-700">
                <div className="relative p-6 pb-12">
                  <div className="flex flex-col items-center">
                    <div className="mb-4 relative">
                      <img
                        className="w-40 h-40 rounded-full shadow-md shadow-blue-400"
                        src={profile?.photo}
                        alt="Profile"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mt-2 dark:text-gray-200">
                      Role: {profile?.role}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      Job Title: {profile?.jobTitle}
                    </h3>
                  </div>
                </div>
                <form className="px-6 pb-6" onSubmit={saveProfile}>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="name"
                      type="text"
                      value={profile?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                      htmlFor="jobTitle"
                    >
                      Job Title
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="jobTitle"
                      type="text"
                      disabled
                      value={profile?.jobTitle}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-gray-100 rounded-md p-2 border border-gray-300 cursor-not-allowed dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
                      name="email"
                      type="email"
                      value={profile?.email}
                      onChange={handleInputChange}
                      disabled
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <input
                      className="block w-full text-sm text-gray-900 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      name="phone"
                      type="text"
                      value={profile?.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400"
                      htmlFor="bio"
                    >
                      Bio
                    </label>
                    <textarea
                      className="block w-full text-sm text-gray-900 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      cols={30}
                      rows={4}
                      name="bio"
                      value={profile?.bio}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button
                    className="bg-blue-600 text-white py-2 rounded-md w-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Profile"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export const UserName = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const username = extractFirstName(user?.name);
  return <p className="text-blue-600">Hi, {username?.toLocaleUpperCase()}</p>;
};

export default Profile;
