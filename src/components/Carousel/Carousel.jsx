import { useState } from "react";

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        {
            src: 'first (1).png',
            alt: 'First slide',
            title: 'Precision in Diagnosis',
            subtitle: 'Cutting-Edge Medical Technology.'
        },
        {
            src: 'ICU (1).png',
            alt: 'Second slide',
            title: 'Always Ready, Always There',
            subtitle: 'Book your ICU now.'
        },
        {
            src: 'third (1).png',
            alt: 'Third slide',
            title: 'Expert Hands, Advanced Techniques',
            subtitle: 'Excellence in Nursery.'
        },
    ];

    const handlePrevClick = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length;
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
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white p-6">
                                <p className="text-6xl font-bold mb-2">{image.title}</p>
                                <div className="text-2xl">{image.subtitle}</div>
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
    );
}

export default Carousel;
