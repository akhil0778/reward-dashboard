import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchActivities = createAsyncThunk('activities/fetchActivities', async () => {
  const response = await fetch(`${import.meta.env.VITE_APP_API_BASE_URL}/activities`);
  const data = await response.json();
  return data;
});

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    activities: [],
    filteredActivities: [],
    filterBy: 'all', 
    status: 'idle',
    error: null,
  },
  reducers: {
    filterActivities: (state, action) => {
      state.filterBy = action.payload;
      state.filteredActivities = state.activities.filter((activity) =>
        state.filterBy === 'all' ? true : activity.type === state.filterBy
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.activities = action.payload;
        state.filteredActivities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { filterActivities } = activitiesSlice.actions;

export default activitiesSlice.reducer;