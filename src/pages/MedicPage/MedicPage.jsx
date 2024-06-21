import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../axios";
import Header from "../../components/MedicalCard/Header";
function MedicPage() {
    const params = useParams();
    const [medic,setMedic] = useState({});

    useEffect(()=> {
        axiosInstance.get(`/${params.role}s/${params.id}'`)
        .then((res) => {
          console.log(res.data)
          setMedic(res.data);
          console.log(medic.user.email)
        })
        .catch((err) => console.log(err))
    },[])

  return (
    <>
    <div className="text-center">
    <Header
    image={medic.image}
    name={medic.user?.name}
    university={medic.university}
    qualifications={medic.qualifications}
    specialization={medic.specialization}
    city={medic.city}
    fees={medic.clinic_fees}
    phone={medic.user?.phone}
    email={medic.user?.email}
    address={medic.Address}
    />
  
    </div>
    </>
  )
}

export default MedicPage