import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { IDashboard } from '../interfaces';

const emptyData: IDashboard = {
  posts: 0,
  likes: 0,
  followers: 0,
  following: 0,
};

const Dashboard: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashBoardData, setDashBoardData] = useState(emptyData);

  const fetchDashboard = async () => {
    const response = await fetch('http://localhost:4000/dashboard');
    const result = (await response.json()) as IDashboard;
    setDashBoardData(result);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1> My dashboard</h1>
      <ul>
        <li>Posts: {dashBoardData.posts}</li>
        <li>Likes: {dashBoardData.likes}</li>
        <li>Followers: {dashBoardData.followers}</li>
        <li>Following: {dashBoardData.following}</li>
      </ul>
    </>
  );
};

export default Dashboard;
