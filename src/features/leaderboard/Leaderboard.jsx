import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard, sortUsers, searchUsers } from './leaderboardSlice';

const Leaderboard = () => {
  const dispatch = useDispatch();
  const { filteredUsers, sortBy, searchQuery, status, error } = useSelector((state) => state.leaderboard);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); 

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const handleSort = (criteria) => {
    dispatch(sortUsers(criteria));
  };

  const handleSearch = (e) => {
    dispatch(searchUsers(e.target.value));
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white dark card p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sorting Buttons */}
      <div className="mb-4">
        <button
          onClick={() => handleSort('points')}
          className={`mr-2 px-4 py-2 rounded-lg ${
            sortBy === 'points' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sort by Points
        </button>
        <button
          onClick={() => handleSort('name')}
          className={`px-4 py-2 rounded-lg ${
            sortBy === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          Sort by Name
        </button>
      </div>

      {/* Leaderboard Table */}
      <table className="w-full">
        <thead className="bg-gray-800 text-left text-white">
          <tr>
            <th className="p-3">Rank</th>
            <th className="p-3">Name</th>
            <th className="p-3">Points</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user, index) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-400">
              <td className="p-3">{index + 1 + (currentPage - 1) * usersPerPage}</td>
              <td className="p-3">{user.name}</td>
              <td className="p-3">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-center">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`mx-1 px-4 py-2 rounded-lg ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;