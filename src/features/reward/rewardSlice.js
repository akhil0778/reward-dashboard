import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRewards = createAsyncThunk('rewards/fetchRewards', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/rewards`);
  const data = await response.json();
  return data;
});

const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: {
    rewards: [],
    filteredRewards: [],
    searchQuery: '',
    status: 'idle',
    error: null,
  },
  reducers: {
    searchRewards: (state, action) => {
      state.searchQuery = action.payload;
      state.filteredRewards = state.rewards.filter((reward) =>
        reward.name.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRewards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.rewards = action.payload;
        state.filteredRewards = action.payload;
      })
      .addCase(fetchRewards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { searchRewards } = rewardsSlice.actions;

export default rewardsSlice.reducer;