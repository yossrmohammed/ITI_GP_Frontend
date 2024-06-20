import { useState, useEffect } from "react"
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import Filters from "../../components/Filters/Filters";
import Skeleton from "../../components/Skeleton";
import axios from "axios";

function Nurses() {

    const [loading,setLoading] = useState(true);
    const [currPage,setCurrPage] = useState(1);
    const [nurses,setNurses] = useState([]);

    useEffect(()=> {
        axios.get('http://localhost:8000/api/nurses')
        .then(res => {
            console.log(res.data)
            setNurses(res.data.data);
            setLoading(false)
        })
        .catch(err => console.log(err));

    },[currPage])

    return (
    <>
    

    <div className="px-10">
        
        <div className="grid grid-rows-2 grid-flow-col gap-4">
            <div className="row-span-3">
                <Filters/>
        </div>


            <div className="container row-span-2 col-span-2">


                {loading && <> <Skeleton/> <Skeleton/> <Skeleton/> <Skeleton/> <Skeleton/> </>}

                <MedicalCard
                proffession='Nurse'
                name='John Doe'
                specialization='Bones'
                city='Cairo'
                fees='500'
                work_days='Sun,Mon'
                work_start='8:00 AM'
                work_end='2:00 PM'
                online='1'
                />
                
                {nurses.map( (el) => {
                    return <MedicalCard
                key={el.id}
                id={el.id}
                proffession='Nurse'
                name={el.user?.name}
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

export default Nurses