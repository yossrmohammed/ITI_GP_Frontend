/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import Filters from "../../components/Filters/Filters";
import Skeleton from "../../components/Skeleton";
import { axiosInstance } from '../../axios';

function Doctors(props) {

    const [loading,setLoading] = useState(true);
    const [currPage,setCurrPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [doctors,setDoctors] = useState([]);
    const [filters, setFilters] = useState({
    name:'',
    city: '',
    specialization: '',
    available: '',
    fees: '',
    });

    useEffect(()=> {
        const obj = {};

        if (filters.city) obj['city'] = filters.city;
        if (filters.specialization) obj['specialization'] = filters.specialization;
        if (filters.fees) obj['fees'] = filters.fees;
        if (filters.available) obj['available'] = filters.available; 
        if (filters.name) obj['name'] = filters.name; 
        obj.page = currPage;
        obj.status = 'accepted';

        if (props.home) 
        {
          obj.visit = 1;
        }
        

        axiosInstance.get('/doctors',
            { params: obj }
        )
        .then(res => {
            setDoctors(res.data.data);
            setTotalPages(res.data.last_page);
            setLoading(false);
        })
        .catch(err => console.log(err));

    },[filters,currPage])

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters
    }));
        setCurrPage(1);
    };

    const handlePageChange = (page) => {
        setCurrPage(page);
    }
    return (
    <>
    

    <div className="px-10">
        
        <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="row-span-3">
                <Filters proffession='Doctor' onFilterChange={handleFilterChange}/>
        </div>


            <div className="container row-span-2 col-span-2">


                {loading && <> <Skeleton/> <Skeleton/> <Skeleton/></>}
                {!loading && doctors.length === 0 && <p className=" text-red-500 my-80 mx-80 text-4xl">No results found.</p> }
                {doctors.map( (el) => {
                    return <MedicalCard
                key={el.user?.id}
                id={el.id}
                image={el.image}
                proffession='Doctor'
                name={el.user?.name}
                specialization={el.specialization}
                city={el.city}
                fees={props.home ? el.clinic_fees : el.home_fees}
                work_days={el.work_days}
                work_start={!props.home ? el.clinic_work_start : el.home_work_start}
                work_end={!props.home ? el.clinic_work_end : el.home_work_end}
                rating={el.average_rating}
                online={el.online}
                />
                })}
            </div>
        </div>
    </div>

    {totalPages > 1 &&
    <div className="text-center">
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

export default Doctors