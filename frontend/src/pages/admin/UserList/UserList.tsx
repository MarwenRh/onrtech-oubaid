import ReactPaginate from "react-paginate";
import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../../hooks/userRedirectLoggedOutUser";
import { useEffect, useState } from "react";
import { getUsers } from "../../../redux/features/auth/authSlice";
import { Loader } from "../../../components/loader/Loader";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { User } from "../../../types/types";
import UserCard from "./UserCard";
import { FaUsers, FaSearch, FaUserShield, FaUserCheck } from "react-icons/fa";

const UserList = () => {
  useRedirectLoggedOutUser("/login");
  useRedirectOnlyAdmins("/profile");

  const { users, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [usersList, setListUsers] = useState<User[]>([]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    setListUsers(users);
  }, [users]);

  const filteredUsers = usersList.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Begin Pagination
  const itemsPerPage = 5;
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  // End Pagination

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % filteredUsers.length;
    setItemOffset(newOffset);
  };

  const adminCount = users.filter(user => user.role === 'admin').length;
  const editorCount = users.filter(user => user.role === 'editor').length;
  const userCount = users.filter(user => user.role === 'user').length;

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-gray-50">
      {isLoading ? (
        <div className="flex justify-center items-center py-16">
          <Loader />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  User Management
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Manage user accounts, roles, and permissions
                </p>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="flex items-center">
                  <FaUsers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      Total Users
                    </p>
                    <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {users.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <FaUserShield className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Administrators
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {adminCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <FaUserCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Editors
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editorCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <FaUsers className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Regular Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userCount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <FaSearch className="h-5 w-5 text-gray-400 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Search Users
                </h3>
              </div>
              <Search value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>

          {/* Users Grid */}
          {currentItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {search ? "No users found" : "No users available"}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {search 
                  ? "Try adjusting your search terms" 
                  : "Users will appear here when they register"
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentItems.map((user) => (
                <UserCard key={user._id} user={user} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-12">
              <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                containerClassName="flex items-center justify-center gap-2"
                pageLinkClassName="px-3 py-2 text-sm leading-tight text-blue-700 bg-white rounded-md border border-blue-200 hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
                previousLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                nextLinkClassName="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                breakLinkClassName="px-3 py-2 text-sm text-blue-700 bg-white rounded-md border border-blue-200 dark:bg-slate-800 dark:text-blue-300 dark:border-white/10"
                activeLinkClassName="ring-2 ring-blue-500"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
