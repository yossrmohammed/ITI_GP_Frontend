import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios";

export default function PatientPage() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/patients/${params.id}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="mx-auto p-8 bg-base-200 border border-gray-300 rounded-lg shadow-lg">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-1/2 p-8 bg-base-200 border border-gray-300 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <h2 className="text-2xl font-bold">Patient Information</h2>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M22 4H2C0.9 4 0.01 4.9 0.01 6L0 18c0 1.1 0.89 2 1.99 2H22c1.1 0 2-0.9 2-2V6C24 4.9 23.1 4 22 4zM22 8L12 13L2 8V6l10 5 10-5V8z"/>
          </svg>
          <span className="text-lg font-medium">{user.email}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <span className="text-lg font-medium">{user.name}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
          </svg>
          <span className="text-lg">{user.phone}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M19 2h-1V1a1 1 0 1 0-2 0v1H8V1a1 1 0 1 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm1 18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8h16v12zM5 6V5a1 1 0 0 1 1-1h1v1a1 1 0 1 0 2 0V4h6v1a1 1 0 1 0 2 0V4h1a1 1 0 0 1 1 1v1H5z"/>
          </svg>
          <span className="text-lg">{user.birth_date}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-2.83-.48-5-2.94-5-5.93h2c0 2.21 1.79 4 4 4v2.93zM13 12h-2V7h2v5zm-1-9C7.47 3 3 7.47 3 12s4.47 9 9 9 9-4.47 9-9-4.47-9-9-9z"/>
          </svg>
          <span className="text-lg">{user.history}</span>
        </div>
        <div className="flex items-center gap-2 mb-4">
          {user.gender === 'm' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M12 2C8.14 2 5 5.14 5 9c0 2.69 1.5 5 3.7 6.24L3 21.94 4.06 23 9.94 17.1c1.24 2.2 3.55 3.7 6.24 3.7 3.86 0 7-3.14 7-7s-3.14-7-7-7zM12 4c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm4 6h-3V6h-2v4H8v2h3v4h2v-4h3z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M15 2h-1V1a1 1 0 1 0-2 0v1h-1C8.9 2 8 2.9 8 4v1H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-1V4c0-1.1-.9-2-2-2zm0 2v1h2v10H7V7h2V4c0-.55.45-1 1-1h4c.55 0 1 .45 1 1zm-3 13c-2.76 0-5-2.24-5-5h2c0 1.65 1.35 3 3 3s3-1.35 3-3h2c0 2.76-2.24 5-5 5zm-1-8h2v4h-2v-4zm0-2h2v1h-2V7zm0-2h2v1h-2V5z"/>
            </svg>
          )}
          <span className="text-lg font-medium">Gender:</span>
          <span className="text-lg">{user.gender === 'm' ? 'Male' : 'Female'}</span>
        </div>

        
      </div>
    </div>
  );
}
