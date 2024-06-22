import { useEffect, useState } from "react"
import { getDoctorById, updateDoctorById } from "/src/axios/DoctorProfile.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";


import TextInput from '/src/components/Form/TextInput.jsx';

function DoctorProfile() {

    const phoneRegExp = /^(010|011|012|015)[0-9]{8}$/;
    const nameRegExp = /^[a-zA-Z ]+$/;

    const doctorId = 1;
    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
      }
    })
    // console.log(formik.values)
    console.log(formik.errors)

    
      if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
      if (!doctor) {
        return <div>No doctor found</div>;
      }
    
    return (
    <>
    

    <div className="px-10">
    <div>
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