import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../store/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { editPatientAction } from "../../store/auth/authActions";

export default function PatientProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function handleFormSubmit(values) {
    dispatch(editPatientAction(values, user.id));
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="mx-auto">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md p-8 bg-base-200 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <Formik
          initialValues={{
            name: user.name,
            email: user.email,
            history: user.history,
            birth_date: user.birth_date,
            phone: user.phone,
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('Name is Required'),
            birth_date: Yup.date().required('Birth Date is Required'),
            phone: Yup.string()
              .required('Phone Number is Required')
              .matches(/^01[0125][0-9]{8}$/, "Invalid Egyptian mobile number. It should start with 010, 011, 012, or 015 and followed by 8 digits.")
              .min(11, 'Must be exactly 11 digits')
              .max(11, 'Must be exactly 11 digits'),
            history: Yup.string().required('Medical History is Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleFormSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <Field name="name" type="text" className="input input-bordered flex-1" placeholder="Name" />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-600" />

              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70">
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                </svg>
                <Field name="phone" type="text" className="input input-bordered flex-1" placeholder="Phone" />
              </div>
              <ErrorMessage name="phone" component="div" className="text-red-600" />

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M4 7h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2zm0 2v10h16V9H4z"/>
                  <path d="M9 4h6v2H9z"/>
                </svg>
                <Field name="birth_date" type="date" className="input input-bordered flex-1" placeholder="Birth Date" />
              </div>
              <ErrorMessage name="birth_date" component="div" className="text-red-600" />

              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M4 19h16v2H4zm0-4h16v2H4zm0-4h16v2H4zm0-4h16v2H4zm0-4h16v2H4z"/>
                </svg>
                <Field as="textarea" name="history" className="textarea textarea-bordered flex-1" placeholder="Medical History" />
              </div>
              <ErrorMessage name="history" component="div" className="text-red-600" />

              <button type="submit" className="btn btn-info w-full mt-4" disabled={isSubmitting}>Update</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
