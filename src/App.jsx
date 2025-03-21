import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import MainContent from './components/layout/MainContent';
import UserProfile from './features/users/UserProfile';
import ActivityFeed from './features/activities/ActivityFeed';
import RewardsList from './features/reward/RewardList';
import Leaderboard from './features/leaderboard/Leaderboard';
import AdminDashboard from './features/admin/AdminDashboard';
import ThemeToggle from './components/ThemeToggle'; 

const App = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <MainContent>
          <Routes>
            <Route path="/" element={<UserProfile userId={1} />} />
            <Route path="/activities" element={<ActivityFeed />} />
            <Route path="/rewards" element={<RewardsList />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </MainContent>
      </div>
      <ThemeToggle />
    </Router>
  );
};

export default App;