import Carousel from "../../components/Carousel/Carousel"
import Slider from '../../components/Slider/Slider'

import ServiceCard from "../../components/ServiceCard/ServiceCard"
import { faUserDoctor, faBriefcaseMedical, faUserNurse, faCheck } from "@fortawesome/free-solid-svg-icons";
import HomeCard from "../../components/HomeCard/HomeCard";

export default function Home() {
  return (
    <>
    <Carousel/>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 container m-auto my-10">
      <HomeCard
        image='/cards/doctor_home_visit.jpg'
        title='Home Visit'
        content='Choose the speciality, and the doctor will visit you at home.'
        book='Book a Visit'
        link='/doctors/home-visit'
      />

      <HomeCard
        image='/cards/doctor_book.webp'
        title='Experienced Doctors'
        content='Choose the speciality, and book an appointment with the doctor.'
        book='Book a Doctor'
        link='/doctors'
      />

      <HomeCard
        image='/cards/nurse_book.avif'
        title='Expert Nurses'
        content='Choose the speciality, and book an appointment with the Nurse.'
        book='Book a Nurse'
      />

      <HomeCard
        image='/cards/book_ICU.jpg'
        title='ICU Availability'
        content='Choose the ICU, and the hospital will contact you.'
        book='Book an ICU'
      />
    </div>

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

