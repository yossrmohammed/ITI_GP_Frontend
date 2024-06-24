import { useEffect, useState } from "react"
import { getDoctorById, updateDoctorById } from "/src/axios/DoctorProfile.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from 'react-select';
import Swal from 'sweetalert2'


import TextInput from '/src/components/Form/TextInput.jsx';
import NumberInput from '/src/components/Form/NumberInput.jsx';
import TimeInput from '/src/components/Form/TimeInput.jsx';
import { egyptianCities } from '/src/data/egyptCities';
import { specalitiesNonCategorized } from '/src/data/specalitiesNonCategorized';
import { universities } from '/src/data/universities'; 
import { workdaysOptions } from '/src/data/workDays'; 
import { qualifications } from '/src/data/qualifications'; 


import "./Profile.css";

function DoctorProfile() {

    const phoneRegExp = /^(010|011|012|015)[0-9]{8}$/;
    const nameRegExp = /^[a-zA-Z ]+$/;
    const qualificationsOptions = qualifications.map(q => ({ value: q, label: q }));


    const doctorId = 1;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHomeVisitChecked, setIsHomeVisitChecked] = useState(false);
    const [file, setFile] = useState(null);

    useEffect(() => {
      if (doctorId) {
        setLoading(true);
        getDoctorById(doctorId)
          .then(response => {
            setDoctor(response.data.data);
            console.log("response date : ",response.data.data)
            setLoading(false);
          })
          .catch(error => {
            setError(error);
            setLoading(false);
          });
      }
    }, []);

 
    const formik = useFormik({
      initialValues: {
        name: "",
        email: "",
        phone: "",
        image: "",
        university: "",
        qualifications: "",
        city: "",
        address: "",
        clinic_fees: "",
        home_fees: "",
        online: 0,
        specialization: "",
        visit: 0,
        clinic_work_start: "",
        clinic_work_end: "",
        home_work_start: "",
        home_work_end: "",
        work_days: "",
    },
      validationSchema: Yup.object({
        name: Yup.string()
          .required("Name is required")
          .matches(
            nameRegExp,
            "Name must contain English alphabetic characters only"
          ),
        phone: Yup.string()
          .required("Phone is required")
          .matches(phoneRegExp, "Invalid phone number"),
        email: Yup.string()
          .required("Email is required")
          .email("Invalid email address"),
        address: Yup.string()
          .required("Address is required"),
        work_days: Yup.string()
          .required("Work Days are required"),
        home_fees:
        Yup.number().required("Home Fees is required").min(1,"Home Fees must be greater than 0"),
        clinic_fees:
        Yup.number().required("Clinic Fees is required").min(1,"Clinic Fees must be greater than 0"),
      }),
      onSubmit:(values)=>{
        console.log("Submit===>",values)
        const formData = new FormData();
        formData.append("name", values.name); 
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("university", values.university);
        formData.append("qualifications", values.qualifications);
        formData.append("city", values.city);
        formData.append("address", values.address);
        formData.append("clinic_fees", values.clinic_fees);
        formData.append("home_fees", values.home_fees);
        formData.append("online", values.online);
        formData.append("specialization", values.specialization);
        formData.append("visit", values.visit);
        formData.append("clinic_work_start", values.clinic_work_start);
        formData.append("clinic_work_end", values.clinic_work_end);
        formData.append("home_work_start", values.home_work_start);
        formData.append("home_work_end", values.home_work_end);
        formData.append("work_days", values.work_days);
        formData.append("_method", "patch");

        updateDoctorById(doctorId, formData)
        .then(response => {
          console.log("update doctor response : ",response)
        })
        .catch(error => {
          console.log("error : ",error)
        });
      }
    })

    useEffect(() => {
      if (doctor) {
        formik.setValues({
          name: doctor.name,
          phone: doctor.phone,
          image: doctor.image,
          email: doctor.email,
          university: doctor.university,
          qualifications: doctor.qualifications,
          city: doctor.city,
          address: doctor.address,
          clinic_fees: doctor.clinic_fees,
          home_fees: doctor.home_fees,
          online: doctor.online,
          specialization: doctor.specialization,
          visit: doctor.visit,
          clinic_work_start: doctor.clinic_work_start,
          clinic_work_end: doctor.clinic_work_end,
          home_work_start: doctor.home_work_start,
          home_work_end: doctor.home_work_end,
          work_days: doctor.work_days,
      });
      
      }
    }, [doctor]);

    const handleHomeVisitChange = (event) => {
      setIsHomeVisitChecked(event.target.checked);
      formik.setFieldValue("visit", event.target.checked ? 1 : 0);
    };
  
    // console.log(formik.values)
    console.log(formik.errors)


    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };
    const handleFileSubmit = (event) => {
      event.preventDefault();
      console.log(file)

      if (!file) {
        alert("Please select a file before submitting.");
        return;
      }

      const ImageformData = new FormData();
      ImageformData.append('_method', "patch");
      ImageformData.append('image', file);


      updateDoctorById(doctorId, ImageformData)
      .then(response => {
        console.log("update doctor Image response : ",response)

        Swal.fire({
          icon: "success",
          text: "Your Image have been updated successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        setDoctor(response.data.data);
      })
      .catch(error => {
        console.log("error : ",error)
      });
    }

      if (loading) {
        return <>
          <div className="flex justify-center">
              <span className="loading loading-dots loading-lg"></span>
              <span className="loading loading-dots loading-lg"></span>
              <span className="loading loading-dots loading-lg"></span>
              <span className="loading loading-dots loading-lg"></span>
          </div>
        </>
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      if (!doctor) {
        return <div>No doctor found</div>;
      }
    
    return (
    <>
    
    <div className="userprofile-container container mx-auto px-8 pt-6 pb-6 rounded-lg flex flex-col md:flex-row my-4">
      {/* Left Section - Avatar and Upload */}
      <div className="left flex flex-col items-center mb-6 md:mb-0">
        <div className="image-div mb-4">
          <div className="avatar">
            <div className="w-40 h-40 rounded-full overflow-hidden ring-2 ring-info ring-offset-base-100 ring-offset-2">
              <img src={`${doctor.image}`} />
            </div>
          </div>
        </div>
        <form onSubmit={handleFileSubmit} className="w-full px-4">
          <div className="mb-4 flex flex-col items-center">
            <input type="file" onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
          
          <button type="submit" className="btn btn-sm btn-info rounded-full py-0 px-5 mt-2">Upload</button>
          </div>
        </form>
      </div>

      {/* Right Section - Form Inputs */}
      <div className="right form-div rounded-lg w-full py-6 px-8 shadow-lg">
      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <TextInput
                label="Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.errors.name}
                placeholder="Name"
              />
              <TextInput
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
                placeholder="Email"
              />
              <TextInput
                label="Phone"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.errors.phone}
                placeholder="Phone"
              />
              <TextInput
                label="Address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.errors.address}
                placeholder="Address"
              />
          
            </div>
          </div>

          <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
            <div>
                <label className="block text-gray-500 font-bold mb-1 md:mb-0">
                  City
                </label>
                <select
                  className="select select-bordered w-full"
                  name="city"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                >
                  {egyptianCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-500 font-bold mb-1 md:mb-0">
                  Specialization
                </label>
                <select
                  className="select select-bordered w-full"
                  name="specialization"
                  onChange={formik.handleChange}
                  value={formik.values.specialization}
                >
                  {specalitiesNonCategorized.map(specialization => (
                    <option key={specialization} value={specialization}>{specialization}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-500 font-bold mb-1 md:mb-0">
                  University
                </label>
                <select
                  className="select select-bordered w-full"
                  name="university"
                  onChange={formik.handleChange}
                  value={formik.values.university}
                >
                  {universities.map(university => (
                    <option key={university} value={university}>{university}</option>
                  ))}
                </select>
              </div>
              <div className="md:flex md:items-center ">
                  {/* <div className="md:w-1/3"> */}
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                      Home Visit
                    </label>
                  {/* </div> */}
                  {/* <div className="md:w-2/3"> */}
                      <input
                        type="checkbox"
                        checked={formik.values.visit}
                        onChange={handleHomeVisitChange}
                        className="checkbox"
                      />
                  {/* </div> */}
              </div>
            </div>
          </div>

          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
              <NumberInput
                  label="Clinic Fees"
                  name="clinic_fees"
                  value={formik.values.clinic_fees}
                  onChange={formik.handleChange}
                  error={formik.errors.clinic_fees}
                  placeholder="Clinic Fees"
                />
                <TimeInput
                  label="Clinic Work Start"
                  name="clinic_work_start"
                  value={formik.values.clinic_work_start}
                  onChange={formik.handleChange}
                  error={formik.errors.clinic_work_start}
                  placeholder="Clinic Work Start"
                />
                <TimeInput
                  label="Clinic Work End"
                  name="clinic_work_end"
                  value={formik.values.clinic_work_end}
                  onChange={formik.handleChange}
                  error={formik.errors.clinic_work_end}
                  placeholder="Clinic Work End"
                />
              </div>
          </div>
          { formik.values.visit == 1 &&
           <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
            <NumberInput
              label="Home Fees"
              name="home_fees"
              value={formik.values.home_fees}
              onChange={formik.handleChange}
              error={formik.errors.home_fees}
              placeholder="home fees"
              />
            <TimeInput
              label="Home Work Start"
              name="home_work_start"
              value={formik.values.home_work_start}
              onChange={formik.handleChange}
              error={formik.errors.home_work_start}
              placeholder="home work start"
              />
            <TimeInput
              label="Home Work End"
              name="home_work_end"
              value={formik.values.home_work_end}
              onChange={formik.handleChange}
              error={formik.errors.home_work_end}
              placeholder="home work end"
              />
            </div>
          </div> }
         
          <div className="col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-2">
              <div>
                <label className="block text-gray-500 font-bold mb-1 md:mb-0">
                  Work Days
                </label>
                <Select
                  isMulti
                  name="work_days"
                  options={workdaysOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={option => {
                    const selectedValues = option ? option.map(item => item.value).join(',') : '';
                    formik.setFieldValue('work_days', selectedValues);
                  }}
                  value={workdaysOptions.filter(option => formik.values.work_days.split(',').includes(option.value))}
                />
                {formik.errors.work_days && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.work_days}</div>
                )}
              </div>
              <div>
                <label className="block text-gray-500 font-bold mb-1 md:mb-0">
                  Qualifications
                </label>
                <Select
                  isMulti
                  name="qualifications"
                  options={qualificationsOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={option => {
                    const selectedValues = option ? option.map(item => item.value).join(',') : '';
                    formik.setFieldValue('qualifications', selectedValues);
                  }}
                  value={qualificationsOptions.filter(option => formik.values.qualifications.includes(option.value))}
                />
                {formik.errors.qualifications && (
                  <div className="text-red-500 text-sm mt-1">{formik.errors.qualifications}</div>
                )}
              </div>
            </div>
          </div>
          

          {/* Submit Button */}
          <div className="col-span-3 mt-6">
            <button
              type="submit"
              className="btn btn-info px-6 py-2 rounded-full text-white font-bold"
              disabled={!formik.isValid}
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>

   
    </>
  )
}

export default DoctorProfile;