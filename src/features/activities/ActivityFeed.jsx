import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities, filterActivities } from './activitiesSlice';

const ActivityFeed = () => {
  const dispatch = useDispatch();
  const { filteredActivities, filterBy, status, error } = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    dispatch(filterActivities(e.target.value));
  };

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white card dark p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Activity Feed</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by:</label>
        <select
          id="filter"
          value={filterBy}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark card"
        >
          <option value="all">All</option>
          <option value="Task Completion">Task Completion</option>
          <option value="Daily Login">Daily Login</option>
          <option value="Content Creation">Content Creation</option>
          <option value="Community Engagement">Community Engagement</option>
        </select>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredActivities.map((activity) => (
          <div key={activity.id} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-2">{activity.type}</h3>
            <p className="text-gray-700 mb-2">{activity.points} points</p>
            <p className="text-gray-500 text-sm">
              {new Date(activity.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;