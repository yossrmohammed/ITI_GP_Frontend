import React from 'react';
import { useNavigate } from 'react-router-dom';

const Verify = () => {
    let navigate = useNavigate();
  const handleVerify = () => {
    navigate('/login?verify=true', { replace: true }); 
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url(https://res.cloudinary.com/deqwn8wr6/image/upload/v1718963330/health-still-life-with-copy-space_yqix7d.jpg)',
    backgroundSize: 'cover',
    fontFamily: 'Arial, sans-serif',
  };

  const formContainerStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
  };

  const imageStyle = {
    width: '150px',
    height: '150px',
    marginLeft: '80px',
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const buttonStyle = {
    padding: '15px 60px', // Increased padding for a wider and taller button
    border: '2px solid #17a2b8',
    backgroundColor: 'transparent',
    color: '#17a2b8',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#17a2b8',
    color: '#fff',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <img 
          src="https://res.cloudinary.com/deqwn8wr6/image/upload/v1718963096/84885fe6d4810d4fd1ff4bebb55584a2_zyh4sc.png" 
          alt="Decorative" 
          style={imageStyle} 
          
        />
        <div style={formStyle}>
          <h1 style={headingStyle}>Verify Your Email</h1>
          <button
            style={buttonStyle}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = buttonHoverStyle.backgroundColor;
              e.target.style.color = buttonHoverStyle.color;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = buttonStyle.backgroundColor;
              e.target.style.color = buttonStyle.color;
            }}
            onClick={handleVerify}
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Verify;
