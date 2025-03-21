import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLeaderboard = createAsyncThunk('leaderboard/fetchLeaderboard', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/users`);
  const data = await response.json();
  return data;
});

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    users: [],
    filteredUsers: [],
    sortBy: 'points', 
    searchQuery: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    sortUsers: (state, action) => {
      state.sortBy = action.payload;
      state.filteredUsers.sort((a, b) => {
        if (state.sortBy === 'points') {
          return b.points - a.points;
        } else if (state.sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    },
    searchUsers: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredUsers = state.users.filter((user) =>
        user.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
        state.filteredUsers = action.payload;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { sortUsers, searchUsers } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;