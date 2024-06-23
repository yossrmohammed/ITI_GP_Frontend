import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from 'yup';
import { editPatientAction } from "../../store/auth/authActions";

export default function PatientProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)
  // const errors = useSelector(selectError)


  useEffect(() => {
    console.log(user);
  }, [user])


  function handleFormSubmit(values) {
    console.log(values)
    dispatch(editPatientAction(values, user.id))
  }

  if (!user) {
    return(<>
      <span className="loading loading-ball loading-xs"></span>
      <span className="loading loading-ball loading-sm"></span>
      <span className="loading loading-ball loading-md"></span>
      <span className="loading loading-ball loading-lg"></span>
    </> 
    )
  }
  return (
    <div>
        <div className="w-1/3 mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-lg mt-8">
          <div className="flex justify-center">
            <span style={{
              fontSize: '1rem',
              fontWeight: 'bold',
            }}>
              {user.email}
            </span>
          </div>
          <Formik
            initialValues={{
                name: user.name,
                email: user.email,
                history: user.history,
                gender: user.gender,
                birth_date: user.birth_date,
                phone: user.phone,
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                .required('Required'),

                birth_date: Yup.date()
                .required('Required'),

                phone: Yup.string()
                .required('Required')
                .matches(/^[0-9]+$/, "Must be only digits")
                .min(7, 'Must be more than 7 digits')
                .max(15, 'Must be less than 15 digits'),
            })}
            onSubmit={(values, {setSubmitting}) => {
                handleFormSubmit(values)
                setSubmitting(false)
            }}
            >
                <Form>
                  
                  {/* Name Field */}
                  <label className="input input-bordered flex items-center gap-2 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <Field name="name" type="text" className="grow" placeholder="Name" />
                      <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
                  </label>
                  
                  {/* Phone Field */}
                  <label className="input input-bordered flex items-center gap-2 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-4 h-4 opacity-70">
                          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
                      </svg>
                      <Field name="phone" type="text" className="grow" placeholder="Phone" />
                      <ErrorMessage name="phone" component="div" style={{ color: 'red' }} />
                  </label>
                  
                  {/* Gender Field */}
                  <label className="input input-bordered flex items-center gap-2 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
                          <path d="M19.242 2.727a1.5 1.5 0 0 0-2.121 0L14.5 5.348 12.879 3.727l2.12-2.121a1.5 1.5 0 1 0-2.12-2.121L10.758 1.606 8.27.464A1.5 1.5 0 1 0 7.152 2.12L9.64 3.263 8.121 4.782l-2.12-2.121a1.5 1.5 0 1 0-2.12 2.121L3.758 4.75 1.636 6.88a1.5 1.5 0 1 0 2.12 2.121l2.122-2.121 1.061 1.06-2.12 2.122a1.5 1.5 0 1 0 2.12 2.12l2.12-2.121 1.061 1.06-2.12 2.122a1.5 1.5 0 1 0 2.12 2.12l2.12-2.121 1.061 1.06-2.12 2.122a1.5 1.5 0 1 0 2.12 2.12l2.121-2.12 1.061 1.06-2.12 2.121a1.5 1.5 0 0 0 2.12 2.121l2.121-2.121 1.061 1.06-2.12 2.121a1.5 1.5 0 1 0 2.12 2.121l2.121-2.121 1.06 1.061 2.122-2.121a1.5 1.5 0 0 0-2.121-2.122L18.394 20.5l1.061-1.061 2.12-2.121a1.5 1.5 0 1 0-2.12-2.121l-2.121 2.12-1.061-1.06 2.12-2.122a1.5 1.5 0 1 0-2.12-2.12l-2.121 2.12-1.061-1.06 2.121-2.122a1.5 1.5 0 1 0-2.121-2.12l-2.122 2.121-1.061-1.06 2.121-2.122a1.5 1.5 0 0 0-2.121-2.121L12.758 5.5l-1.06-1.061L12.879 2.18a1.5 1.5 0 0 0 2.121-2.12l-1.757 1.756L19.242 2.727z"/>
                      </svg>
                      <Field as="select" name="gender" className="grow">
                          <option selected={true} disabled={true}>Select Gender</option>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                      </Field>
                  </label>
                  
                  {/* Birth Date Field */}
                  <label className="input input-bordered flex items-center gap-2 mt-3">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70">
                          <path d="M19 2h-1V1a1 1 0 1 0-2 0v1H8V1a1 1 0 1 0-2 0v1H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zm1 18a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8h16v12zM5 6V5a1 1 0 0 1 1-1h1v1a1 1 0 1 0 2 0V4h6v1a1 1 0 1 0 2 0V4h1a1 1 0 0 1 1 1v1H5z"/>
                      </svg>
                      <Field name="birth_date" type="date" className="grow" placeholder="Birth Date" />
                      <ErrorMessage name="birth_date" component="div" style={{ color: 'red' }} />
                  </label>
                  
                  {/* Submit Button */}
                  <input type="submit" value="Update" className="btn btn-info mx-auto mt-4" />
              </Form>

            </Formik>
        </div>
    </div>
  )
}
