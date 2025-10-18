import { useEffect, useState } from "react";
import { Loader } from "../../../components/loader/Loader";
import axios from "axios";
import { formatDate } from "../../../utils/fomatDate";
import useRedirectOnlyAdmins from "../../../hooks/useRedirectOnlyAdmins";
import { HiMail, HiCalendar, HiUsers, HiDownload } from "react-icons/hi";
import { toast } from "react-toastify";

const Subscribers = () => {
  useRedirectOnlyAdmins("/profile");
  const [loading, setLoading] = useState(true);
  const [subscribers, setSubscribers] = useState([]);
  const [count, setCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const BACKEND_URL = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    const getSub = async () => {
      try {
        const resp = await axios.get(`${BACKEND_URL}/subscriptions`);
        setCount(resp.data.count);
        setSubscribers(resp.data.subscriptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscribers", error);
        toast.error("Failed to load subscribers");
        setLoading(false);
      }
    };
    getSub();
  }, []);

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const csvContent = [
      ["Email", "Subscribed Date"],
      ...filteredSubscribers.map((sub) => [
        sub.email,
        formatDate(sub.subscribedAt)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Subscribers exported successfully");
  };

  return (
    <div className="min-h-screen dark:bg-slate-900 bg-gray-50">
      {loading ? (
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
                  Newsletter Subscribers
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Manage your newsletter subscribers and export data
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-center">
                    <HiUsers className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        Total Subscribers
                      </p>
                      <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                        {count}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search subscribers by email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                    />
                  </div>
                </div>
                <button
                  onClick={exportToCSV}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  <HiDownload className="h-5 w-5 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        <HiMail className="h-4 w-4 mr-2" />
                        Email Address
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      <div className="flex items-center">
                        <HiCalendar className="h-4 w-4 mr-2" />
                        Subscribed Date
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSubscribers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <HiMail className="h-12 w-12 text-gray-400 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            {searchTerm ? "No subscribers found" : "No subscribers yet"}
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {searchTerm 
                              ? "Try adjusting your search terms" 
                              : "Subscribers will appear here when they sign up for your newsletter"
                            }
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers.map((subscriber, index) => (
                      <tr
                        key={subscriber._id}
                        className={`hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                          index % 2 === 0 ? "bg-white dark:bg-slate-800" : "bg-gray-50 dark:bg-slate-700"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                              <HiMail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {subscriber.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">
                            {formatDate(subscriber.subscribedAt)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Active
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Stats */}
          {filteredSubscribers.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredSubscribers.length} of {count} subscribers
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Subscribers;
