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

  return (
    <div className="">
      {isLoading && <Loader />}

      <div className="mx-auto py-8 p-6 bg-white shadow dark:bg-slate-900">
        <div className="flex flex-col justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-100 m-10">
            Currnetly we have {users.length} active user
          </h3>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {/* Users Table */}
        {isLoading || currentItems.length === 0 ? (
          <p className="dark:text-gray-100 text-center text-2xl">
            Searching Users ...
          </p>
        ) : (
          <div className="w-11/12 mx-auto flex flex-wrap flex-col md:flex-row justify-center items-center">
            {currentItems.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        // Tailwind CSS classes
        containerClassName="flex items-center justify-center space-x-2 dark:bg-slate-900"
        pageLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        previousLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-l hover:bg-blue-700"
        nextLinkClassName="py-2 px-3 leading-tight text-white bg-blue-500 rounded-r hover:bg-blue-700"
        breakLinkClassName="py-2 px-3 leading-tight text-blue-600 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
        activeLinkClassName="py-2 px-3 leading-tight text-blue-900 bg-white rounded-md border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
      />
    </div>
  );
};

export default UserList;
