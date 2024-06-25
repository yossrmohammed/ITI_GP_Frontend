/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faEnvelope, faLocationDot, faMoneyBillWave, faPhone, faUserDoctor, faCalendarAlt, faClinicMedical, faHome } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogTitle, IconButton, Card, CardContent, Typography, Grid } from '@mui/material';
import { Close } from '@mui/icons-material';
import dayjs from "dayjs"; // Library for date manipulation

function Header(props) {
  const headerClass = "text-lg font-semibold card-title";
  const iconClass = "text-blue-600 text-3xl";
  const rate = Number(props.rating) || 0;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // Track selected option
  const [upcomingDates, setUpcomingDates] = useState([]); // Track upcoming dates for work days

  // Define all days of the week
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    if (props.work_days) {
      // Parse work days from props
      const workDays = props.work_days.split(", ").map(day => day.trim());

      // Calculate the next dates for the work days
      const nextDates = workDays.map(day => {
        // Find the index of the day in the daysOfWeek array
        const dayIndex = daysOfWeek.indexOf(day);

        // Calculate the upcoming date for this day
        const today = dayjs();
        const todayIndex = today.day(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

        // Calculate the days until the next occurrence of the target day
        let daysToAdd = dayIndex - todayIndex;
        if (daysToAdd < 0) {
          daysToAdd += 7; // Add 7 days if the day is in the past
        }

        const nextDate = today.add(daysToAdd, 'day');
        return {
          day,
          date: nextDate.format("dddd, MMMM D, YYYY") // Format the date
        };
      });

      setUpcomingDates(nextDates);
    }
  }, [props.work_days]);

  const handleBooking = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDayModalOpen(false); // Close both modals if needed
    setSelectedOption(null); // Reset the selected option
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsModalOpen(false); // Close the initial modal
    setIsDayModalOpen(true); // Open the day selection modal
  };

  return (
    <div className="container mx-auto p-5">
      <div className="card lg:card-side bg-base-200 shadow-xl border-2 p-5">
        <div className="lg:w-1/3">
          {props.image ? (
            <img
              src={props.image}
              alt={props.role}
              className="m-auto my-10 w-40 rounded-full"
            />
          ) : (
            <img
              src={
                props.role === 'doctor'
                  ? "https://i.ibb.co/J5XNVjg/default-doctor.webp"
                  : "https://i.ibb.co/7ybQ2T4/default-nurse.png"
              }
              alt={props.role}
              className="mx-auto my-10 w-40 rounded-full ring ring-base-content"
            />
          )}
        </div>
        <div className="card-body lg:w-2/3">
          <h2 className={`card-title text-2xl font-bold mb-1`}>{props.role === 'doctor' ? 'Dr:' : 'Nurse:'} {props.name}</h2>
          <Rating rate={rate} />

          <div>
            <h3 className={headerClass}>Qualifications: </h3>
            <p className="font-normal">{props.qualifications} </p>
          </div>

          <div className="mt-4 inline-block">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faBuildingColumns} />
              Education: <span className="font-normal">{props.university} </span>
            </h3>
          </div>

          {props.role === 'doctor' && (
            <div className="mt-4">
              <h3 className={headerClass}>
                <FontAwesomeIcon className={iconClass} icon={faUserDoctor} />
                Specialization: <span className="font-normal">{props.specialization} </span>
              </h3>
            </div>
          )}

          <div className="mt-4">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faMoneyBillWave} />
              Clinic Fees: <span className="font-normal">{props.clinic_fees} EGP</span>
            </h3>
          </div>

          <div className="mt-4">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faMoneyBillWave} />
              Home Visit Fees: <span className="font-normal">{props.home_fees} EGP</span>
            </h3>
          </div>

          {props.role === 'doctor' && (
            <div className="mt-4">
              <h3 className={headerClass}>
                <FontAwesomeIcon className={iconClass} icon={faLocationDot} />
                Clinic Address: <span className="font-normal">{props.address}</span>
              </h3>
            </div>
          )}

          <div className="mt-4">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faEnvelope} />
              Email: <span className="font-normal">{props.email}</span>
            </h3>
          </div>

          <div className="mt-4">
            <h3 className={headerClass}>
              <FontAwesomeIcon className={iconClass} icon={faPhone} />
              Phone: <span className="font-normal">{props.phone}</span>
            </h3>
          </div>

          <div className="card-actions justify-end mt-4">
            <button className="btn btn-primary" onClick={handleBooking}>Book Appointment</button>
            <button className="btn btn-outline">Contact</button>
          </div>
        </div>
      </div>

      {/* Initial Booking Modal */}
      <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">Book an Appointment</span>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Clinic Section */}
            <Grid item xs={12} sm={6}>
              <Card
                className="hover:shadow-lg cursor-pointer"
                onClick={() => handleOptionClick('Clinic')}
              >
                <CardContent className="text-center">
                  <FontAwesomeIcon icon={faClinicMedical} size="2x" className="text-blue-600 mb-2" />
                  <Typography variant="h6">Clinic</Typography>
                  <Typography>Fees: {props.clinic_fees} EGP</Typography>
                  <Typography>Working Hours: {props.clinic_work_start} - {props.clinic_work_end}</Typography>
                </CardContent>
              </Card>
            </Grid>
            {/* Home Section */}
            <Grid item xs={12} sm={6}>
              <Card
                className="hover:shadow-lg cursor-pointer"
                onClick={() => handleOptionClick('Home')}
              >
                <CardContent className="text-center">
                  <FontAwesomeIcon icon={faHome} size="2x" className="text-blue-600 mb-2" />
                  <Typography variant="h6">Home</Typography>
                  <Typography>Fees: {props.home_fees} EGP</Typography>
                  <Typography>Working Hours: {props.home_work_start} - {props.home_work_end}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Day Selection Modal */}
      <Dialog open={isDayModalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">Select a Day for {selectedOption} Appointment</span>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
          {daysOfWeek.map((day) => {
              const nextDate = upcomingDates.find(d => d.day === day);
              const isDisabled = !nextDate; // Disable if no next date for this day
              return (
                <Grid item xs={12} sm={6} md={4} key={day}>
                  <Card className={`hover:shadow-lg ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} disabled={isDisabled}>
                    <CardContent className="text-center">
                      <FontAwesomeIcon icon={faCalendarAlt} size="2x" className={`text-blue-600 mb-2 ${isDisabled ? 'opacity-50' : ''}`} />
                      <Typography variant="h6">{day}</Typography>
                      {nextDate && <Typography>{nextDate.date}</Typography>}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;

