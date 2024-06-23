// ChatBotButton.js
import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import DoctorSearch from './DoctorSearch'; // Import DoctorSearch component

const ChatBotButton = () => {
  const [showChatBot, setShowChatBot] = useState(false);

  const toggleChatBot = () => {
    setShowChatBot(!showChatBot);
  };

  const theme = {
    background: '#f5f8fb',
    headerBgColor: '#00bfff',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#00bfff',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

  return (
    <div>
      <button
        onClick={toggleChatBot}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#00bfff',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          cursor: 'pointer',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        Chat
      </button>

      {showChatBot && (
        <div
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '300px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <ThemeProvider theme={theme}>
            <ChatBot
              steps={[
                {
                  id: '1',
                  message: 'Welcome to the Health Service Bot! How can I assist you today?',
                  trigger: 'options',
                },
                {
                  id: 'options',
                  options: [
                    { value: 'find_doctor', label: 'Find a Doctor', trigger: 'find_doctor' },
                    { value: 'book_appointment', label: 'Book an Appointment', trigger: 'book_appointment' },
                    { value: 'upload_prescription', label: 'Upload Prescription', trigger: 'upload_prescription' },
                    { value: 'pay', label: 'Make a Payment', trigger: 'pay' },
                  ],
                },
                {
                  id: 'find_doctor',
                  message: 'Please enter the city name to find doctors:',
                  trigger: 'city_name',
                },
                {
                  id: 'city_name',
                  user: true,
                  trigger: 'show_doctors',
                },
                {
                  id: 'show_doctors',
                  component: <DoctorSearch />,
                  waitAction: true,
                  trigger: 'options',
                },
                {
                  id: 'book_appointment',
                  message: 'Please provide the doctor/nurse ID and your preferred date and time.',
                  trigger: 'appointment_info',
                },
                {
                  id: 'appointment_info',
                  user: true,
                  trigger: 'appointment_confirmation',
                },
                {
                  id: 'appointment_confirmation',
                  message: 'Booking appointment for {previousValue}...',
                  trigger: 'options',
                },
                {
                  id: 'upload_prescription',
                  message: 'Please upload your prescription.',
                  trigger: 'prescription_upload',
                },
                {
                  id: 'prescription_upload',
                  user: true,
                  trigger: 'upload_confirmation',
                },
                {
                  id: 'upload_confirmation',
                  message: 'Uploading prescription...',
                  trigger: 'options',
                },
                {
                  id: 'pay',
                  message: 'Please provide the amount and patient ID for payment.',
                  trigger: 'payment_info',
                },
                {
                  id: 'payment_info',
                  user: true,
                  trigger: 'payment_confirmation',
                },
                {
                  id: 'payment_confirmation',
                  message: 'Processing payment of {previousValue}...',
                  trigger: 'options',
                },
              ]}
              handleEnd={() => setShowChatBot(false)}
            />
          </ThemeProvider>
        </div>
      )}
    </div>
  );
};

export default ChatBotButton;
