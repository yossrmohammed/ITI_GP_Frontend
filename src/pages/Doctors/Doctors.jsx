import { useEffect, useState } from "react"
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import Filters from "../../components/Filters/Filters";
import Skeleton from "../../components/Skeleton";
import { axiosInstance } from '../../axios';
import axios from "axios";
function Doctors() {

    const [loading,setLoading] = useState(true);
    const [currPage,setCurrPage] = useState(1);
    const [doctors,setDoctors] = useState([]);
    const [filters, setFilters] = useState({
    city: '',
    specialization: '',
    available: '',
    fees: ''
    });

    useEffect(()=> {
        const obj = {};

        if (filters.city) obj['city'] = filters.city;
        if (filters.specialization) obj['specialization'] = filters.specialization;
        if (filters.fees) obj['fees'] = filters.fees;
        console.log(obj)
        axios.get('http://localhost:8000/api/doctors',
            { params: obj }
        )
        .then(res => {
            console.log(res.data)
            setDoctors(res.data.data);
            setLoading(false)
        })
        .catch(err => console.log(err));
        console.log(filters)

    },[filters])

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
        ...prevFilters,
        ...newFilters
    }));
    };

    return (
    <>
    

    <div className="px-10">
        
        <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="row-span-3">
                <Filters proffession='Doctor' onFilterChange={handleFilterChange}/>
        </div>


            <div className="container row-span-2 col-span-2">


                {loading && <> <Skeleton/> <Skeleton/> <Skeleton/></>}

                {doctors.map( (el) => {
                    return <MedicalCard
                key={el.id}
                id={el.id}
                proffession='Doctor'
                name={el.user?.name}
                specialization={el.specialization}
                city={el.city}
                fees={el.clinic_fees}
                work_days={el.work_days}
                work_start={el.clinic_work_start}
                work_end={el.clinic_work_end}
                online={el.online}
                />
                })}
            </div>
        </div>
    </div>

    <div className="text-center">
    <div className="join my-5">
        <button className="join-item btn">«</button>
        <button className="join-item btn btn-md">1</button>
        <button className="join-item btn btn-md btn-active">2</button>
        <button className="join-item btn btn-md">3</button>
        <button className="join-item btn btn-md">4</button>
        <button className="join-item btn">»</button>
    </div>
    </div>
    </>
  )
}

export default Doctors