import { useEffect, useState } from "react";
import { Loader } from "../../../components/loader/Loader";

import axios from "axios";
import { formatDate } from "../../../utils/fomatDate";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";

const Subscribers = () => {
  useRedirectOnlyAdmins("/profile");
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getSub = async () => {
      try {
        const resp = await axios.get("http://localhost:5000/api/subscriptions");
        setCount(resp.data.count);
        setSubscribers(resp.data.subscriptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscribers", error);
        setLoading(false);
      }
    };
    getSub();
  }, []);

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-gray-100">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white shadow-md rounded-lg pt-4 w-11/12 lg:w-8/12 mx-auto p-4 dark:bg-slate-600">
          <div className="bg-blue-500 text-white rounded-t-lg py-2">
            <h1 className="text-xl font-semibold">Subscribers ({count})</h1>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-100 border-b">
                <tr>
                  <th className="py-2 px-4 text-left ">Email</th>
                  <th className="py-2 px-4 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((subscriber) => (
                  <tr
                    key={subscriber._id}
                    className="border-b hover:bg-gray-50 bg-slate-200"
                  >
                    <td className="py-2 px-4">{subscriber.email}</td>
                    <td className="py-2 px-4">
                      {formatDate(subscriber.subscribedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
