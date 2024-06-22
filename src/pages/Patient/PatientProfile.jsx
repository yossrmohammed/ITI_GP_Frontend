import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectUser } from "../../store/auth/authSlice";

export default function PatientProfile() {
  const user = useSelector(selectUser)

  useEffect(() => {
    console.log(user);
  }, [user])

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
        <div>PatientProfile</div>
    </div>
  )
}
