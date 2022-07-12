import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
import { IDashboard } from '../interfaces';

const emptyData: IDashboard = {
  posts: 0,
  likes: 0,
  followers: 0,
  following: 0,
};

const fetcher = async () => {
  const response = await fetch('http://localhost:4000/dashboard');
  const result = (await response.json()) as IDashboard;

  return result;
};

const DashboardSWR: NextPage = () => {
  const { data, error } = useSWR('dashboard', fetcher);

  if (error) return <div>An error has occured</div>;

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <h1> My dashboard</h1>
      <ul>
        <li>Posts: {data.posts}</li>
        <li>Likes: {data.likes}</li>
        <li>Followers: {data.followers}</li>
        <li>Following: {data.following}</li>
      </ul>
    </>
  );
};

export default DashboardSWR;
