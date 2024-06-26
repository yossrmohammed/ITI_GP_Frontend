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
            name: Yup.string().required('Required'),
            birth_date: Yup.date().required('Required'),
            phone: Yup.string()
              .required('Required')
              .matches(/^[0-9]+$/, "Must be only digits")
              .min(7, 'Must be more than 7 digits')
              .max(15, 'Must be less than 15 digits'),
            history: Yup.string().required('Required'),
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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
                  <path d="M19 2h-1V1a1 1 0 1 0-2 0v1H8V1a1 1 0 1 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm1 18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8h16v12zM5 6V5a1 1 0 0 1 1-1h1v1a1 1 0 1 0 2 0V4h6v1a1 1 0 1 0 2 0V4h1a1 1 0 0 1 1 1v1H5z"/>
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
