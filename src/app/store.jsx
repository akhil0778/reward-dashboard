import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../features/users/usersSlice';
import activitiesReducer from '../features/activities/activitiesSlice';
import rewardsReducer from '../features/reward/rewardSlice';
import leaderboardReducer from '../features/leaderboard/leaderboardSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    activities: activitiesReducer,
    rewards: rewardsReducer,
    leaderboard: leaderboardReducer,
    admin: adminReducer,
  },
});