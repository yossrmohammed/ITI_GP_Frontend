import { useState } from 'react';

const SpecializationSlider = () => {
  const specializations = [
    { name: 'Cardiology', img: '/slider/cardiology.jpeg' },
    { name: 'Neurology', img: '/slider/neurology.jpeg' },
    { name: 'Pediatrics', img: '/slider/pediatrics.jpeg' },
    { name: 'Dermatology', img: '/slider/dermatology.jpeg' },
    { name: 'Oncology', img: '/slider/oncology.jpg' },
    { name: 'Gynecology', img: '/slider/gynecology.jpeg' },
    { name: 'Orthopedics', img: '/slider/orthopedics.jpeg' },
    { name: 'Psychiatry', img: '/slider/psychiatry.jpeg' },
    { name: 'Radiology', img: '/slider/radiology.webp' },
    { name: 'Urology', img: '/slider/urology.jpeg' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? specializations.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === specializations.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full overflow-hidden my-10 px-10">
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevClick}
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
        >
          &laquo;
        </button>
        <div className="relative w-full mx-4 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`
            }}
          >
            {specializations.map((specialization, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/3 lg:w-1/4 p-4"
              >
                <div className="p-4 rounded-lg shadow-lg bg-white border-2">
                  <img
                    src={specialization.img}
                    alt={specialization.name}
                    className="w-full h-32 object-cover rounded-t-lg"
                  />
                  <p className="text-center font-bold mt-2 text-blue-600">{specialization.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
        >
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default SpecializationSlider;
