import React, { useState, useEffect } from 'react';
import BarChart from './BarChart'; // Adjust the path based on your project structure
import { axiosInstance } from '../../axios';

const Statistics = () => {
  const [doctorData, setDoctorData] = useState({ labels: [], datasets: [] });
  const [nurseData, setNurseData] = useState({ labels: [], datasets: [] });
  const [activeDoctorsData, setActiveDoctorsData] = useState({ labels: [], datasets: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const fetchDoctorData = axiosInstance.get('/doctors?page=1');
    const fetchNurseData = axiosInstance.get('/nurses?page=1');
    const fetchTopActiveDoctor = axiosInstance.get('/doctors?topActiveUser=true');

    Promise.all([fetchDoctorData, fetchNurseData, fetchTopActiveDoctor])
      .then(([doctorResponse, nurseResponse, topDoctorsResponse]) => {
        const doctors = doctorResponse.data.data;
        const nurses = nurseResponse.data.data;
        const topDoctorsActive = topDoctorsResponse.data.data;

        const doctorStates = [...new Set(doctors.map(doc => doc.user.name || 'Unknown'))];
        const doctorRatings = doctors.map((doctor) => doctor.average_rating);

        const doctorChartData = {
          labels: doctorStates,
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
        setDoctorData(doctorChartData);

        const nurseStates = [...new Set(nurses.map(nurse => nurse.user.name || 'Unknown'))];
        const nurseRatings = nurses.map(nurse => nurse.average_rating);
        const nurseChartData = {
          labels: nurseStates,
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
        setNurseData(nurseChartData);

        const activeDoctorsChartData = {
          labels: topDoctorsActive.map(doc => doc.doctor_name),
          datasets: [
            {
              label: 'Prescriptions',
              data: topDoctorsActive.map(doc => doc.prescriptions_count),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        };
        setActiveDoctorsData(activeDoctorsChartData);

        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mb-8">
      <h2 className="text-xl font-bold mb-4">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="flex justify-center">
          <div className="w-full md:w-4/5 lg:w-2/3 p-4">
            <BarChart data={doctorData} title="Top Rated Doctors by State" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-4/5 lg:w-2/3 p-4">
            <BarChart data={nurseData} title="Top Rated Nurses by State" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full md:w-4/5 lg:w-2/3 p-4">
            <BarChart data={activeDoctorsData} title="Top Active Doctors by Prescriptions" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
