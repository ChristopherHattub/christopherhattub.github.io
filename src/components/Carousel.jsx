import React from 'react';
import Slider from 'react-slick';
import './styles/Carousel.css'; 

const carouselItems = [
  { link: '/projects/project1', image: '../assets/images/p-value.png' },
  { link: '/projects/project2', image: '../assets/images/web-background.png' },
  // Add more carousel items here..
];

const Carousel = () => {
  const settings = {
    centerMode: true,
    centerPadding: '0',
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className="carousel-item">
            <a href={item.link}>
              <img src={item.image} alt={`Project ${index + 1}`} />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
