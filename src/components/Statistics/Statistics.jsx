// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import BarChart from './BarChart'; // Adjust the path based on your project structure

const Statistics = () => {
  const [doctorData, setDoctorData] = useState({ labels: [], datasets: [] });
  const [nurseData, setNurseData] = useState({ labels: [], datasets: [] });
  const [activeDoctorsData, setActiveDoctorsData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    // Fake data for doctors and nurses with state information
    const fakeDoctors = [
      { id: 1, name: 'Dr. John Doe', rating: 4.9, state: 'California', prescriptions: 120 },
      { id: 2, name: 'Dr. Jane Smith', rating: 4.8, state: 'New York', prescriptions: 110 },
      { id: 3, name: 'Dr. Alice Johnson', rating: 4.7, state: 'Texas', prescriptions: 130 },
      { id: 4, name: 'Dr. Bob Brown', rating: 4.6, state: 'California', prescriptions: 140 },
    ];

    const fakeNurses = [
      { id: 1, name: 'Nurse John Doe', rating: 4.9, state: 'California' },
      { id: 2, name: 'Nurse Jane Smith', rating: 4.8, state: 'New York' },
      { id: 3, name: 'Nurse Alice Johnson', rating: 4.7, state: 'Texas' },
      { id: 4, name: 'Nurse Bob Brown', rating: 4.6, state: 'California' },
    ];

    // Aggregate data by state and calculate average ratings
    const states = [...new Set([...fakeDoctors.map(doc => doc.state), ...fakeNurses.map(nurse => nurse.state)])];
    const doctorRatings = states.map(state => {
      const stateDoctors = fakeDoctors.filter(doc => doc.state === state);
      return stateDoctors.reduce((sum, doc) => sum + doc.rating, 0) / stateDoctors.length;
    });
    const nurseRatings = states.map(state => {
      const stateNurses = fakeNurses.filter(nurse => nurse.state === state);
      return stateNurses.reduce((sum, nurse) => sum + nurse.rating, 0) / stateNurses.length;
    });

    const doctorData = {
      labels: states,
      datasets: [
        {
          label: 'Doctors',
          data: doctorRatings,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };

    const nurseData = {
      labels: states,
      datasets: [
        {
          label: 'Nurses',
          data: nurseRatings,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    // Data for top active doctors based on the number of prescriptions
    const topActiveDoctors = fakeDoctors.map(doc => ({
      name: doc.name,
      prescriptions: doc.prescriptions,
    }));

    const activeDoctorsData = {
      labels: topActiveDoctors.map(doc => doc.name),
      datasets: [
        {
          label: 'Prescriptions',
          data: topActiveDoctors.map(doc => doc.prescriptions),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };

    setDoctorData(doctorData);
    setNurseData(nurseData);
    setActiveDoctorsData(activeDoctorsData);
  }, []);

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full justify-items-center">
        <div className="w-full md:w-4/5 lg:w-2/3 p-4" style={{ height: '20rem' }}>
          <BarChart data={doctorData} title="Top Rated Doctors by State" />
        </div>
        <div className="w-full md:w-4/5 lg:w-2/3 p-4" style={{ height: '20rem' }}>
          <BarChart data={nurseData} title="Top Rated Nurses by State" />
        </div>
        <div className="w-full md:w-4/5 lg:w-2/3 p-4 " style={{ height: '20rem' }}>
          <BarChart data={activeDoctorsData} title="Top Active Doctors by Prescriptions" />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
