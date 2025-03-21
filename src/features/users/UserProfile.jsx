
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './usersSlice';
import ActivityDistributionChart from '../../components/charts/ActivityDistributionCharts';
import PointsProgressChart from '../../components/charts/PoitsProgressChart';

const UserProfile = ({ userId }) => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div className="text-center py-4">User not found</div>;
  }

  return (
    <div className="bg-white dark card p-6 rounded-lg shadow-md">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <img
          src={user.profilePicture}
          alt={user.name}
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-700">{user.points} points</p>
       
      </div>

      {/* Activity Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recent Activities</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">{activity.type}</p>
              <p className="text-gray-500 text-sm">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
              <p className="text-gray-700 font-bold">{activity.points} points</p>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-500 hover:underline">
          View All Activities
        </button>
      </div>

      <div className='grid grid-cols-1  md:grid-cols-2 gap-6 mb-6 '>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Points Progress</h3>
        <div className="bg-white h-64 p-6 rounded-lg shadow-lg">
          <PointsProgressChart activities= {user.activities}/>
        </div>
      </div>

      {/* Activity Distribution Chart */}
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Activity Distribution</h3>
        <div className="bg-white h-64 p-6 rounded-lg shadow-lg">
          <ActivityDistributionChart activities={user.activities} />
        </div>
      </div>
      </div>

      {/* Rewards Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4">Recently Redeemed Rewards</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {user.rewards.slice(0, 5).map((reward) => (
            <div key={reward.id} className="bg-gray-50 p-4 rounded-lg shadow-md">
              <p className="text-gray-700">{reward.name}</p>
              <p className="text-gray-500 text-sm">
                {new Date(reward.timestamp).toLocaleString()}
              </p>
              <p className="text-gray-700 font-bold">{reward.points} points</p>
            </div>
          ))}
        </div>
        <button className="mt-4 text-blue-500 hover:underline">
          View All Rewards
        </button>
      </div>

      {/* Point History */}
      <div>
        <h3 className="text-xl font-bold mb-4">Point History</h3>
        <table className="w-full">
          <thead className="bg-gray-800 text-white text-left">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Points</th>
              <th className="p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {user.pointHistory.map((entry) => (
              <tr key={entry.id} className="border-b border-gray-200  hover:bg-gray-400">
                <td className="p-3">{entry.type}</td>
                <td className="p-3">{entry.points}</td>
                <td className="p-3">{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-8 text-center">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;