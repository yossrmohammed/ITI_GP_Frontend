import { useState } from "react";
function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: 'first (1).png',
      alt: 'First slide',
      text: 'Precision in Diagnosis – Cutting-Edge Medical Technology.'
    },
    {
      src: 'ICU (1).png',
      alt: 'Second slide',
      text: 'Always Ready, Always There Book your ICU now.'
    },
    {
      src: 'third (1).png',
      alt: 'Third slide',
      text: 'Expert Hands, Advanced Techniques – Excellence in Nursery.'
    },
  ];

  const handlePrevClick = () => {
    const newIndex = (currentIndex - 1 + images.length) <= 0 ? images.length - 1 : (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const handleNextClick = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (

    <div className="relative w-full">
      <div className="overflow-hidden relative">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <div key={index} className="min-w-full flex-shrink-0 relative">
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-3xl font-bold">
                {image.text}
              </div>
            </div>
        ))}
        </div>
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
      >
        &laquo;
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
      >
        &raquo;
      </button>
    </div>





  )
}

export default Carousel
{/* <div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src="pexels-pixabay-40568.jpg" className="object-fill" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide2" className="carousel-item relative w-full">
    <img src="pexels-pixabay-263402.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div> 
  <div id="slide3" className="carousel-item relative w-full">
    <img src="pexels-pixabay-356040.jpg" className="w-full" />
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div> 
</div> */}