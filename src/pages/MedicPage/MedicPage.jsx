import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../axios";
import Header from "../../components/MedicalCard/Header";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
function MedicPage() {
    const params = useParams();
    const [medic,setMedic] = useState({});
    const [page,setPage] = useState(1);
    const [reviews,setReviews] = useState([]);

    useEffect(()=> {
        axiosInstance.get(`/${params.role}s/${params.id}'`)
        .then((res) => {
          setMedic(res.data.data);
          console.log(res.data.data)
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(()=> {
      axiosInstance.get(`${params.role}s/${params.id}/reviews`)
      .then(res => {
        setReviews(res.data.data.data)
        console.log(res.data.data.data)
      })
      .catch( err => console.log(err)  )
    },[page])

    function handlePageChange(page)
    {
      setPage(page);
    }

  return (
    <>
    <div className="">
    {
      params.role === 'doctor'
      &&
    <Header
    role={params.role}
    image={medic.image}
    name={medic.name}
    university={medic.university}
    qualifications={medic.qualifications}
    specialization={medic.specialization}
    city={medic.city}
    fees={medic.clinic_fees}
    phone={medic.phone}
    email={medic.email}
    address={medic.address}
    rating={medic.average_rating}
    />
    }

    {
      params.role === 'nurse'
      &&
      <Header
      role={params.role}
      image={medic.image}
      name={medic.name}
      university={medic.university}
      qualifications={medic.qualifications}
      city={medic.city}
      fees={medic.fees}
      phone={medic.phone}
      email={medic.email}
      />
    }
    

    <h2 className="text-2xl font-bold mb-5 ml-28 mt-10">
      {params.role === 'doctor' ? 'Doctor ' : 'Nurse '}
      Reviews</h2>
      {reviews.length === 0 && <p className="text-xl my-10 text-center">No Reviews Yet</p>}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-28">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>

    </>
  )
}

export default MedicPage