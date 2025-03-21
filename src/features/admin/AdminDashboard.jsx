import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchRewards, fetchActivities } from './adminSlice';
import PointDistributionChart from '../../components/charts/PointDistributionChart';
import RewardRedemptionsChart from '../../components/charts/RewardRedemptionsChart';
import ActivityTrendsChart from '../../components/charts/ActivityTrendsChart';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, rewards, activities, status, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRewards());
    dispatch(fetchActivities());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6   bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-black mb-6">Admin Dashboard</h1>

      {/* Charts Grid */}
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 dark card  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Point Distribution</h2>
          <div className="h-64">
            <PointDistributionChart users={users} />
          </div>
        </div>

        {/* Reward Redemptions Chart */}
        <div className="bg-white p-6 dark card rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-2">Reward Redemptions</h2>
          <div className="h-64">
            <RewardRedemptionsChart rewards={rewards} />
          </div>
        </div>
      </div>

      {/* Activity Trends Chart */}
      <div className="bg-white p-6 card rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Activity Trends</h2>
        <div className="h-96">
          <ActivityTrendsChart activities={activities} />
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-black mb-4">Users</h2>
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Points</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-400">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.points}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      onClick={() => alert(`Edit user: ${user.name}`)} // Placeholder for edit logic
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rewards Table */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-black mb-4">Rewards</h2>
          <table className="w-full">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Points</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map((reward) => (
                <tr key={reward.id} className="border-b border-gray-200 hover:bg-gray-400">
                  <td className="p-3">{reward.name}</td>
                  <td className="p-3">{reward.points}</td>
                  <td className="p-3">{reward.description}</td>
                  <td className="p-3">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                      onClick={() => alert(`Edit reward: ${reward.name}`)} // Placeholder for edit logic
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Log */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-black mb-4">Activity Log</h2>
        <ul>
          {activities.map((activity) => (
            <li key={activity.id} className="mb-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-100">
              <p className="text-gray-700">
                {activity.type}: {activity.points} points by User {activity.userId} on {new Date(activity.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;