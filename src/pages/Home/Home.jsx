import Carousel from "../../components/Carousel/Carousel"
import Slider from '../../components/Slider/Slider'

import ServiceCard from "../../components/ServiceCard/ServiceCard"
import { faUserDoctor, faBriefcaseMedical, faUserNurse, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
    <Carousel/>
    
    <h1 className="ml-36 text-3xl font-bold my-2 p-3 border-b-2 border-red-500 w-1/6 text-blue-600">Our Services</h1>
    <div className="flex justify-evenly mx-5">
    <ServiceCard
    title="Urgent ICU booking"
    body="Request your intensive care unit and we'll contact you immediatly"
    icon={faUserDoctor}
    />

    <ServiceCard
    title="All your healthcare needs"
    body="Search and book a clinic visit, home visit. and book a service or operation."
    icon={faBriefcaseMedical}
    />

    <ServiceCard
    title="Nuresry service"
    body="Search and book a clinic nurse home visit Order your medicine and book a service or operation."
    icon={faUserNurse}
    />

    <ServiceCard
    title="Your booking is confirmed"
    body="Your booking is confirmed , as the doctor specifies his working hours and is notified of the booking details."
    icon={faCheck}
    />
    </div>

    <h1 className="mb-4 ml-36 text-3xl font-bold my-2 p-3 border-b-2 border-red-500 w-1/4 text-blue-600">Medical Specializations</h1>
    <Slider/>
    </>
  )
}

