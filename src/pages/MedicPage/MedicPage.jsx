import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { axiosInstance } from "../../axios";
import Header from "../../components/MedicalCard/Header";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
function MedicPage() {
    const params = useParams();
    const [medic,setMedic] = useState(null);
    const [currPage,setCurrPage] = useState(1);
    const [totalPages,setTotalPages] = useState(0);
    const [reviews,setReviews] = useState([]);

    useEffect(()=> {
        axiosInstance.get(`/${params.role}s/${params.id}'`)
        .then((res) => {
          setMedic(res.data.data);
          console.log(res.data.data);
        })
        .catch((err) => console.log(err))
    },[])

    useEffect(()=> {
      axiosInstance.get(`${params.role}s/${params.id}/reviews`, {params: {page:currPage}})
      .then(res => {
        setReviews(res.data.data.data)
        setTotalPages(res.data.data.last_page)
      })
      .catch( err => console.log(err)  )
    },[currPage])

    function handlePageChange(page)
    {
      setCurrPage(page);
    }
  console.log("Medic", medic)
  if (!medic) {
    return (
      <div>Loading..</div>
    )
  }
  return (
    <>
    <div className="">
    {
      params.role === 'doctor'
      &&
    <Header
    medic_id={medic.id}
    role={params.role}
    image={medic.image}
    name={medic.name}
    university={medic.university}
    qualifications={medic.qualifications}
    specialization={medic.specialization}
    city={medic.city}

    clinic_fees={medic.clinic_fees}
    clinic_work_end={medic.clinic_work_end}
    clinic_work_start={medic.clinic_work_start}
    
    home_fees={medic.home_fees}
    home_work_end={medic.home_work_end}
    home_work_start={medic.home_work_start}

    phone={medic.phone}
    email={medic.email}
    address={medic.address}
    rating={medic.average_rating}
    work_days={medic.work_days}

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

          {totalPages > 1 &&
    <div className="text-centernurses">
            <div className="join my-5">
            <button
                className="join-item btn"
                onClick={() => handlePageChange(currPage - 1)}
                disabled={currPage === 1}
            >
                «
            </button>
            {[...Array(totalPages).keys()].map((page) => (
                <button
                key={page + 1}
                className={`join-item btn btn-md ${currPage === page + 1 ? 'btn-active' : ''}`}
                onClick={() => handlePageChange(page + 1)}
                >
                {page + 1}
                </button>
            ))}
            <button
                className="join-item btn"
                onClick={() => handlePageChange(currPage + 1)}
                disabled={currPage === totalPages}
            >
                »
            </button>
            </div>
        </div>
        }
    </>
  )
}

export default MedicPage