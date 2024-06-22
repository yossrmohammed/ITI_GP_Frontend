import { useEffect, useState } from "react"
import { getDoctorById, updateDoctorById } from "/src/axios/DoctorProfile.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";


import TextInput from '/src/components/Form/TextInput.jsx';
import NumberInput from '/src/components/Form/NumberInput.jsx';
import TimeInput from '/src/components/Form/TimeInput.jsx';


function DoctorProfile() {

    const phoneRegExp = /^(010|011|012|015)[0-9]{8}$/;
    const nameRegExp = /^[a-zA-Z ]+$/;

    const doctorId = 1;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isHomeVisitChecked, setIsHomeVisitChecked] = useState(false);


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
          .required("Address is required")
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
    

    <div className="">
    <div className="" style={{backgroundColor:"red"}}>
      {/* --------------------------------Form---------------------------------------- */}
      <form onSubmit={formik.handleSubmit}>
          {/* -------------------------- Name -------------------------- */}
          <TextInput
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.errors.name}
              placeholder="name"
            />
          {/* -------------------------- Email -------------------------- */}
          <TextInput
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.errors.email}
              placeholder="email"
            />
          {/* -------------------------- Phone -------------------------- */}
          <TextInput
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.errors.phone}
              placeholder="phone"
            />
          {/* -------------------------- Address -------------------------- */}
          <TextInput
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.errors.address}
              placeholder="address"
            />
          {/* -------------------------- Clinic Fields -------------------------- */}
          {/* Horizontal Container */}
          <div className="flex flex-wrap mb-6">
            <NumberInput
              label="Clinic Fees"
              name="clinic_fees"
              value={formik.values.clinic_fees}
              onChange={formik.handleChange}
              error={formik.errors.clinic_fees}
              placeholder="clinic fees"
              className="w-full md:w-1/3 px-2"
            />
            <TimeInput
              label="Clinic Work Start"
              name="clinic_work_start"
              value={formik.values.clinic_work_start}
              onChange={formik.handleChange}
              error={formik.errors.clinic_work_start}
              placeholder="clinic work start"
              className="w-full md:w-1/3 px-2"
            />
            <TimeInput
              label="Clinic Work End"
              name="clinic_work_end"
              value={formik.values.clinic_work_end}
              onChange={formik.handleChange}
              error={formik.errors.clinic_work_end}
              placeholder="clinic work end"
              className="w-full md:w-1/3 px-2"
            />
          </div>
      {/* ---------------------- Home Visite --------------------------  */}
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                Home Visite
                </label>
            </div>
            <div className="md:w-2/3">
            <input
            type="checkbox"
            className="checkbox"
            checked={formik.values.visit === 1}
            onChange={handleHomeVisitChange}
          />
            </div>
          </div>
          {/* -------------------------- Home Fees -------------------------- */}
          { formik.values.visit == 1 &&
            <>
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
            </>
          }
              {/* --------------------------Submit Button -------------------------- */}
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="update-btn rounded-full shadow info btn  btn-accent text-white font-bold py-2 px-4 rounded"
                    type="submit"
                    disabled={!formik.isValid}>
                    Update Profile
                  </button>
                </div>
            </div>
      </form>
    </div>
   
    </div>

   
    </>
  )
}

export default DoctorProfile