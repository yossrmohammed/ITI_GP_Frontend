import Carousel from "../../components/Carousel/Carousel"
import Footer from "../../components/Footer/Footer"
import Navbar from "../../components/Navbar/Navbar"
import ServiceCard from "../../components/ServiceCard/ServiceCard"

export default function Home() {
  return (
    <>
    <Carousel/>

    <h1 className="text-center text-3xl font-bold my-2">Our Services</h1>
    <div className="flex justify-evenly mx-5">
    <ServiceCard
    title="Urgent ICU booking"
    body="Request your intensive care unit and we'll contact you immediatly"
    />

    <ServiceCard
    title="All your healthcare needs"
    body="Search and book a clinic visit, home visit. and book a service or operation."
    />

    <ServiceCard
    title="Nuresry service"
    body="Search and book a clinic nurse home visit Order your medicine and book a service or operation."
    />

    <ServiceCard
    title="Your booking is confirmed"
    body="Your booking is confirmed , as the doctor specifies his working hours and is notified of the booking details."
    />
    </div>

    </>
  )
}

