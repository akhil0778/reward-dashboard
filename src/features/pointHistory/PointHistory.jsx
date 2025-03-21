import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPointHistory } from './pointHistorySlice';

const PointHistory = ({ userId }) => {
  const dispatch = useDispatch();
  const pointHistory = useSelector((state) => state.pointHistory.history);
  const status = useSelector((state) => state.pointHistory.status);
  const error = useSelector((state) => state.pointHistory.error);

  useEffect(() => {
    dispatch(fetchPointHistory(userId));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Point History</h3>
      <ul>
        {pointHistory.map((entry) => (
          <li key={entry.timestamp} className="mb-2">
            <p>{entry.activity}: {entry.points} points on {new Date(entry.timestamp).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PointHistory;