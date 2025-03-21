Reward System Dashboard
A comprehensive rewards management dashboard application built with React, Redux, and Tailwind CSS.

Features
User Management: Display user profiles and track points.
Activity Management: Log and view point-earning activities.
Rewards Marketplace: Browse and redeem rewards.
Leaderboard: View top point earners.
Admin Dashboard: Manage users, rewards, and activities.
Setup
Clone the repository:
git clone https://github.com/akhil0778/reward-dashboard.git
Install dependencies:
npm install
Start the development server:
npm start
Start the mock API server (in a separate terminal):
REACT_APP_API_BASE_URL=http://localhost:3000

Environment Variables
Create a .env file in the root of the project and add the following: ```bash VITE_APP_API_BASE_URL=http://localhost:3000

Technologies Used
React
Redux Toolkit
Tailwind CSS
Chart.js
JSON Server (mock API)


Backend (JSON Server)
The mock backend is hosted separately to fetch data on render
