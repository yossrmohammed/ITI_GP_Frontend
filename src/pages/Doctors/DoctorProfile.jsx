import { useEffect, useState } from "react"
import { getDoctorById, updateDoctorById } from "/src/axios/DoctorProfile.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";

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
        
      }),
      onSubmit:(values)=>{
        console.log("Submit===>",values)
      }
    })
    // console.log(formik.values)
    // console.log(formik.errors)

    
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
            <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                   Name
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    className="input input-bordered input-sm w-full max-w-xs"
                  />

                  {
                    formik.errors.name ? <p
                    className="mt-3"
                    style={{ color: "red", fontSize: "14px" }}>
                    {formik.errors.name}
                  </p> : null
                  }
                </div>
            </div>

          {/* -------------------------- Email -------------------------- */}
          <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                   Email
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    className="input input-bordered input-sm w-full max-w-xs"
                  />

                  {
                    formik.errors.email ? <p
                    className="mt-3"
                    style={{ color: "red", fontSize: "14px" }}>
                    {formik.errors.email}
                  </p> : null
                  }
                </div>
            </div>
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