import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import DoctorSearch from './DoctorSearch'; // Import DoctorSearch component
import NurseSearch from './NurseSearch'; // Import NurseSearch component
import PrescriptionUpload from './PrescriptionUpload';

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

  const handleTriggerNextStep = (trigger) => {

    console.log('Triggering next step:', trigger);
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
                    { value: 'find_doctor', label: 'Find a Doctor', trigger: 'find_doctor_option' },
                    { value: 'find_nurse', label: 'Find a Nurse', trigger: 'find_nurse_option' }, 
                    { value: 'upload_prescription', label: 'Upload Prescription', trigger: 'upload_prescription' },
                  ],
                },
                {
                  id: 'find_doctor_option',
                  message: 'Would you like to search by city or by doctor name?',
                  trigger: 'doctor_search_options',
                },
                {
                  id: 'doctor_search_options',
                  options: [
                    { value: 'city', label: 'City', trigger: 'find_doctor_by_city' },
                    { value: 'name', label: 'Doctor Name', trigger: 'find_doctor_by_name' },
                  ],
                },
                {
                  id: 'find_doctor_by_city',
                  message: 'Please enter the city name to find doctors:',
                  trigger: 'city_name',
                },
                {
                  id: 'find_doctor_by_name',
                  message: 'Please enter the doctor name to search for:',
                  trigger: 'doctor_name',
                },
                {
                  id: 'city_name',
                  user: true,
                  trigger: 'show_doctors',
                },
                {
                  id: 'doctor_name',
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
                  id: 'find_nurse_option',
                  message: 'Would you like to search by city or by nurse name?',
                  trigger: 'nurse_search_options',
                },
                {
                  id: 'nurse_search_options',
                  options: [
                    { value: 'city', label: 'City', trigger: 'find_nurse_by_city' },
                    { value: 'name', label: 'Nurse Name', trigger: 'find_nurse_by_name' },
                  ],
                },
                {
                  id: 'find_nurse_by_city',
                  message: 'Please enter the city name to find nurses:',
                  trigger: 'nurse_city_name',
                },
                {
                  id: 'find_nurse_by_name',
                  message: 'Please enter the nurse name to search for:',
                  trigger: 'nurse_name',
                },
                {
                  id: 'nurse_city_name',
                  user: true,
                  trigger: 'show_nurses',
                },
                {
                  id: 'nurse_name',
                  user: true,
                  trigger: 'show_nurses',
                },
                {
                  id: 'show_nurses',
                  component: <NurseSearch />,
                  waitAction: true,
                  trigger: 'options',
                },
                {
                  id: 'upload_prescription',
                  message: 'Please upload your prescription:',
                  trigger: 'prescription_upload',
                },
                {
                  id: 'prescription_upload',
                  component: <PrescriptionUpload triggerNextStep={handleTriggerNextStep} />, 
                  waitAction: true,
                  trigger: 'options',
                },
                {
                  id: 'upload_confirmation',
                  message: 'Uploading prescription...',
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
