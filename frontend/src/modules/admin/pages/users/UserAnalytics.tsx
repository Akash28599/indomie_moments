import { useState, useCallback } from "react";
import { useGetUserAnalyticsQuery } from "@/store";
import { env } from "@/config/env";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupIcon from "@mui/icons-material/Group";

const PAGE_SIZE = 20;

const UserAnalytics = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading } = useGetUserAnalyticsQuery({
    page,
    limit: PAGE_SIZE,
    search: search || undefined,
  });

  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setSearch(searchInput.trim());
      setPage(1);
    },
    [searchInput]
  );

  const handleExport = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const url = `${env.API_BASE_URL}/admin/users/analytics/export${params.toString() ? `?${params.toString()}` : ""}`;
    window.open(url, "_blank");
  }, [search]);

  // Summary stats
  const totalUsers = total;
  const totalPosts = users.reduce((sum, u) => sum + u.totalPosts, 0);
  const totalLikes = users.reduce((sum, u) => sum + u.totalLikes, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">User Analytics</h1>
        <p className="text-gray-600 mt-1">
          View user activity, posts, and engagement metrics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <GroupIcon className="text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Users</p>
            <p className="text-2xl font-black text-gray-900">
              {totalUsers.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <PhotoCameraIcon className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total Posts (page)
            </p>
            <p className="text-2xl font-black text-gray-900">
              {totalPosts.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <FavoriteIcon className="text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">
              Total Likes (page)
            </p>
            <p className="text-2xl font-black text-gray-900">
              {totalLikes.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Search + Export */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by name or phone..."
                className="w-full pl-10 pr-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-[#E2231A] focus:outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="bg-[#E2231A] text-white px-5 py-2.5 rounded-lg font-bold hover:bg-[#c41e16] transition-colors"
            >
              Search
            </button>
          </form>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            <DownloadIcon fontSize="small" />
            Export CSV
          </button>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#E2231A] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-12">
            <PersonIcon sx={{ fontSize: 48 }} className="text-gray-300 mb-2" />
            <p className="text-gray-500 font-medium">No users found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Campaign
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                      Posts
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                      Approved
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                      Pending
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
                      Likes
                    </th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <PersonIcon
                              sx={{ fontSize: 16 }}
                              className="text-gray-500"
                            />
                          </div>
                          <span className="font-semibold text-gray-900 text-sm">
                            {user.fullName || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-700 font-mono">
                        {user.phoneNumber}
                      </td>
                      <td className="py-3 pr-4 text-sm text-gray-600">
                        {user.campaignName || "—"}
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full text-sm font-bold">
                          {user.totalPosts}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                          {user.approvedPosts}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold">
                          {user.pendingPosts}
                        </span>
                      </td>
                      <td className="py-3 text-center">
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-800 rounded-full text-sm font-bold">
                          {user.totalLikes}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-gray-600">
                        {new Date(user.registeredAt).toLocaleDateString(
                          "en-NG",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages} ({total} total users)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-4 py-2 border-2 border-gray-200 rounded-lg text-sm font-semibold hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page >= totalPages}
                    className="px-4 py-2 bg-[#E2231A] text-white rounded-lg text-sm font-bold hover:bg-[#c41e16] disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserAnalytics;
