import { useState, useEffect } from "react"
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import Filters from "../../components/Filters/Filters";
import Skeleton from "../../components/Skeleton";
import { axiosInstance } from '../../axios';

function Nurses() {

    const [loading,setLoading] = useState(true);
    const [currPage,setCurrPage] = useState(1);
    const [totalPages,setTotalPages] = useState(1);
    const [nurses,setNurses] = useState([]);
    const [filters, setFilters] = useState({
    name:'',
    city: '',
    specialization: '',
    available: '',
    fees: ''
    });

    useEffect(()=> {
        const obj = {};

        if (filters.city) obj['city'] = filters.city;
        if (filters.fees) obj['fees'] = filters.fees;
        if (filters.available) obj['available'] = filters.available; 
        if (filters.name) obj['name'] = filters.name; 
        if (filters.specialization) obj['specialization'] = filters.specialization;

        console.log(obj);

        obj.page = currPage;
        obj.status = 'accepted';

        axiosInstance.get('/nurses',
            { params: obj }
        )
        .then(res => {
            setNurses(res.data.data);
            setTotalPages(res.data.last_page);
            setLoading(false)
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
    

    <div className="px-10 py-10">
        
        <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="row-span-3">
                <Filters proffession='Nurse' onFilterChange={ handleFilterChange }/>
        </div>


            <div className="container row-span-2 col-span-2">


                {loading && <> <Skeleton/> <Skeleton/> <Skeleton/> <Skeleton/> <Skeleton/> </>}
                {!loading && nurses.length === 0 && <p className=" text-red-500 my-80 mx-80 text-4xl">No results found.</p> }
                
                {nurses.map( (el) => {
                    return <MedicalCard
                key={el.id}
                id={el.id}
                image={el.image}
                proffession='Nurse'
                name={el.user?.name}
                city={el.city}
                fees={el.fees}
                work_days={el.work_days}
                work_start={el.work_start}
                work_end={el.work_end}
                specialization={el.specialization}
                rating={Number(el.average_rating)}
                online={el.online}
                />
                })}

            </div>
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

export default Nurses