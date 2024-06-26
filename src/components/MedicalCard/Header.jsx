/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import Rating from "../Rating/Rating";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faEnvelope, faLocationDot, faMoneyBillWave, faPhone, faUserDoctor, faCalendarAlt, faClinicMedical, faHome, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogTitle, DialogActions, IconButton, Card, CardContent, Typography, Grid, Button, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import dayjs from "dayjs"; // Library for date manipulation
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import Swal from "sweetalert2"; // Sweetalert for alerts
import { axiosInstance } from "../../axios";

function Header(props) {
  const headerClass = "text-lg font-semibold card-title";
  const iconClass = "text-blue-600 text-3xl";
  const rate = Number(props.rating) || 0;
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null); // Track selected option
  const [upcomingDates, setUpcomingDates] = useState([]); // Track upcoming dates for work days
  const [prescriptionImage, setPrescriptionImage] = useState(null); // Track selected prescription image
  const [imagePreview, setImagePreview] = useState(""); // Track preview URL of the selected image

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
    if (props.role === "doctor") {
      setIsModalOpen(true);
    } else {
      setIsDayModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDayModalOpen(false); // Close both modals if needed
    setIsPrescriptionModalOpen(false);
    setSelectedPlace(null); // Reset the selected option
  };

  const handlePlaceClick = (option) => {
    setSelectedPlace(option);
    setIsModalOpen(false); // Close the initial modal
    setIsDayModalOpen(true); // Open the day selection modal
  };

  const handleDateClick = (day, nextDate) => {
    setIsDayModalOpen(false); // Close the day selection modal
    let amount = 0;
    if (selectedPlace == "Clinic") {
      amount = props.clinic_fees;
    }
    else {
      amount = props.home_fees ?? props.fees;
    }
    navigate('/checkout', {
      state: {
        amount,
        full_date: {
          day,
          date: nextDate.date
        },
        kind_of_visit: selectedPlace,
        medic_role: props.role,
        medic_id: props.medic_id,
      }
    });
  };

  const openPrescriptionModal = () => {
    setIsPrescriptionModalOpen(true);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPrescriptionImage(file);
      setImagePreview(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleSubmitPrescription = async () => {
    // Implement the logic for submitting the prescription image
    // For demonstration, we'll just log the file and show an alert
    if (prescriptionImage) {
      // Here, you would typically upload the image to your server
      try {
        await axiosInstance.post(`/patients/${user.id}/prescription`, {
          doctor_id: props.medic_id,
          prescription_image: prescriptionImage,
        }, { headers: {
          'Content-Type': 'multipart/form-data',
        }});
        Swal.fire({
          icon: "success",
          text: "Prescription uploaded successfully",
          showConfirmButton: true,
          timer: 1500,
        });
      }
      catch (error) {
        Swal.fire({
          icon: "error",
          text: "Failed to uploaded the prescription",
          showConfirmButton: true,
          timer: 1500,
        });
      }
      // Close the modal and reset the image states
      closeModal();
      setPrescriptionImage(null);
      setImagePreview("");
    } else {
      Swal.fire({
        icon: "error",
        text: "Please select an image first",
        showConfirmButton: true,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="card lg:card-side bg-base-200 shadow-xl border-2 p-5">
        <div className="lg:w-1/3">
          {props.image ? (
            <img
              src={props.image}
              alt={props.role}
              className="m-auto my-10 w-56 h-56 object-cover rounded-full "
            />
          ) : (
            <img
              src={
                props.role === 'doctor'
                  ? "https://i.ibb.co/J5XNVjg/default-doctor.webp"
                  : "https://i.ibb.co/7ybQ2T4/default-nurse.png"
              }
              alt={props.role}
              className="m-auto my-10 w-56 h-56 object-cover rounded-full "
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
          {props.role === 'doctor' && (
            <>
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
            </>
          )}

          {props.role === 'nurse' && (
            <div className="mt-4">
              <h3 className={headerClass}>
                <FontAwesomeIcon className={iconClass} icon={faMoneyBillWave} />
                Fees: <span className="font-normal">{props.fees} EGP</span>
              </h3>
            </div>
          )}

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
          {
            user && user.role === 'patient' && (
              <div className="card-actions justify-end mt-4">
                <button className="btn btn-info" onClick={handleBooking}>Book Appointment</button>
                {
                  props && props.role === 'doctor' && (
                    <button className="btn btn-primary" onClick={openPrescriptionModal}>Upload Prescription</button>
                  )
                }
              </div>
            )
          }
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
                onClick={() => handlePlaceClick('Clinic')}
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
                onClick={() => handlePlaceClick('Home')}
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
          <span className="text-lg font-semibold">Select a Day for {selectedPlace} Appointment</span>
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
                  <Card
                    className={`hover:shadow-lg ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    onClick={() => handleDateClick(day, nextDate)}
                  >
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

      {/* Prescription Upload Modal */}
      <Dialog open={isPrescriptionModalOpen} onClose={closeModal} fullWidth maxWidth="md">
        <DialogTitle className="flex justify-between items-center">
          <span className="text-lg font-semibold">Upload Prescription</span>
          <IconButton onClick={closeModal}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="prescription-input"
          />
          <label htmlFor="prescription-input">
            <Button
              variant="outlined"
              component="span"
              startIcon={<FontAwesomeIcon icon={faUpload} />}
            >
              Select Image
            </Button>
          </label>
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Prescription Preview"
                className="m-auto w-full h-60 object-contain"
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmitPrescription} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Header;
