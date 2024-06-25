// NurseSearch.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { axiosInstance } from '../../axios'; 

const NurseSearch = ({ steps, triggerNextStep }) => {
  const { nurse_city_name, nurse_name } = steps;
  const [loading, setLoading] = useState(true);
  const [nurses, setNurses] = useState([]);
  const baseUrl = import.meta.env.VITE_FRONT_URL; 
  useEffect(() => {
    const fetchNurses = async (city, name) => {
      try {
        const response = await axiosInstance.get('/nurses', { params: { city, name } });
        setNurses(response.data.data);
      } catch (error) {
        console.error('Error fetching nurses:', error);
      } finally {
        setLoading(false);
      }
    };

    if (nurse_city_name?.value || nurse_name?.value) {
      fetchNurses(nurse_city_name?.value, nurse_name?.value);
    }
  }, [nurse_city_name, nurse_name]);

  return (
    <div>
      {loading ? (
        <p>Loading nurses...</p>
      ) : nurses.length > 0 ? (
        <div>
          <p>Here are the nurses (click on name to get nurse page):</p>
          <ul>
            {nurses.map((nurse) => (
              <li key={nurse.id}>
                <a href={`${baseUrl}/user/nurse/${nurse.id}`} target="_blank" rel="noopener noreferrer">
                  {nurse.user?.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No nurses found.</p>
      )}
      <button onClick={triggerNextStep}>Next</button>
    </div>
  );
};



export default NurseSearch;
