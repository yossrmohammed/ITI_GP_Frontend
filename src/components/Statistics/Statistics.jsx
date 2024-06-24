// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../axios'; 
import TopRatedList from '../TopRatedList/TopRatedList';

const Statistics = () => {
  const [topDoctors, setTopDoctors] = useState([]);
  const [topNurses, setTopNurses] = useState([]);

  useEffect(() => {
   /* axiosInstance .get('/api/doctors/top-rated').then(response => {
      setTopDoctors(response.data);
    });

    axiosInstance.get('/api/nurses/top-rated').then(response => {
      setTopNurses(response.data);
    });*/
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <TopRatedList title="Top 5 Rated Doctors" items={topDoctors} />
      <TopRatedList title="Top 5 Rated Nurses" items={topNurses} />
    </div>
  );
};

export default Statistics;
