import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../../axios'; // Import your axios instance

const DoctorSearch = ({ steps, triggerNextStep }) => {
  const { city_name, doctor_name } = steps;
  const [loading, setLoading] = useState(true);
  const [doctors, setDoctors] = useState([]);
  const baseUrl = import.meta.env.VITE_FRONT_URL; // Use VITE_FRONT_URL

  useEffect(() => {
    const fetchDoctors = async (city, name) => {
      try {
        const response = await axiosInstance.get('/doctors', { params: { city, name } });
        setDoctors(response.data.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    if (city_name?.value || doctor_name?.value) {
      fetchDoctors(city_name?.value, doctor_name?.value);
    }
  }, [city_name, doctor_name]);

  return (
    <div>
      {loading ? (
        <p>Loading doctors...</p>
      ) : doctors.length > 0 ? (
        <div>
          <p>Here are the doctors (click on name to get nurse page):</p>
          <ul>
            {doctors.map((doctor) => (
              <li key={doctor.id}>
                <a href={`${baseUrl}/user/doctor/${doctor.id}`} target="_blank" rel="noopener noreferrer">
                  {doctor.user?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No doctors found.</p>
      )}
      <button onClick={triggerNextStep}>Next</button>
    </div>
  );
};

DoctorSearch.propTypes = {
  steps: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
};

export default DoctorSearch;
