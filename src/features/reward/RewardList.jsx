import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewards, searchRewards } from './rewardSlice';

const RewardsList = () => {
  const dispatch = useDispatch();
  const { filteredRewards, searchQuery, status, error } = useSelector((state) => state.rewards);

  useEffect(() => {
    dispatch(fetchRewards());
  }, [dispatch]);

  const handleSearch = (e) => {
    dispatch(searchRewards(e.target.value));
  };

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white dark card p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Rewards Marketplace</h2>

      {/* Search Bar */}
      <div className="mb-4 ">
        <input
          type="text"
          placeholder="Search rewards..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRewards.map((reward) => (
          <div key={reward.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <img
              src={reward.image}
              alt={reward.name}
              className="w-full h-32 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{reward.name}</h3>
            <p className="text-gray-700 mb-2">{reward.description}</p>
            <p className="text-gray-700 font-bold">{reward.points} points</p>
            <button
              className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              onClick={() => alert(`Redeemed: ${reward.name}`)} // Placeholder for redemption logic
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardsList;