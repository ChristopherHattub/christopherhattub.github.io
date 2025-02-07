import React, { useState, useEffect } from 'react';
import './Career.css';

const Career = () => {
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [isOtherPosition, setIsOtherPosition] = useState(false);
  
  const careerPositions = [
    {
      title: "Senior Software Engineer",
      company: "Tech Innovations Inc",
      period: "2023 - Present",
      description: "Leading development of enterprise-scale applications using modern technologies. Mentoring junior developers and architecting scalable solutions.",
      image: "path/to/image1.jpg"
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Co",
      period: "2021 - 2023",
      description: "Developed and maintained full-stack applications using React, Node.js, and AWS. Implemented CI/CD pipelines and automated testing.",
      image: "path/to/image2.jpg"
    },
    {
      title: "Web Developer",
      company: "Creative Agency",
      period: "2020 - 2021",
      description: "Created responsive web applications and e-commerce solutions. Collaborated with design team to implement pixel-perfect UIs.",
      image: "path/to/image3.jpg"
    },
    {
      title: "Frontend Developer",
      company: "StartUp Labs",
      period: "2019 - 2020",
      description: "Built interactive user interfaces using React and modern CSS. Optimized application performance and implemented analytics.",
      image: "path/to/image4.jpg"
    },
    {
      title: "Junior Developer",
      company: "Tech Academy",
      period: "2018 - 2019",
      description: "Developed educational web platforms and learning management systems. Implemented responsive designs and accessibility features.",
      image: "path/to/image5.jpg"
    }
  ];

  const otherPositions = [
    {
      title: "Crew Member",
      company: "Dunkin' Donuts",
      period: "2014 - 2015",
      description: "Provided excellent customer service in a fast-paced environment. Managed food preparation, cash handling, and store cleanliness while maintaining efficiency during peak hours.",
      image: "path/to/dunkin.jpg"
    },
    {
      title: "Crew Member",
      company: "Jersey Mike's",
      period: "2013 - 2014",
      description: "Prepared high-quality sandwiches while ensuring customer satisfaction. Maintained food safety standards and handled cash transactions accurately.",
      image: "path/to/jerseymikes.jpg"
    },
    {
      title: "Sales Associate",
      company: "Best Buy",
      period: "2013",
      description: "Assisted customers with electronics purchases and provided technical support. Maintained product knowledge to offer informed recommendations.",
      image: "path/to/bestbuy.jpg"
    },
    {
      title: "Server",
      company: "Local Restaurant",
      period: "2012 - 2013",
      description: "Delivered exceptional dining experiences through attentive service. Managed multiple tables while maintaining high customer satisfaction.",
      image: "path/to/restaurant.jpg"
    },
    {
      title: "Camp Counselor",
      company: "Summer Youth Program",
      period: "2012",
      description: "Led activities and supervised groups of children. Developed and implemented educational and recreational programs.",
      image: "path/to/camp.jpg"
    }
  ];

  useEffect(() => {
    let interval;
    if (isAutoScrolling && !showOtherMenu && !isOtherPosition) {
      interval = setInterval(() => {
        setSelectedPosition((prev) => 
          (prev + 1) % careerPositions.length
        );
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoScrolling, showOtherMenu, isOtherPosition]);

  const handlePositionClick = (index, fromOtherMenu = false) => {
    setIsAutoScrolling(false);
    setSelectedPosition(index);
    setIsOtherPosition(fromOtherMenu);
    if (fromOtherMenu) {
      setShowOtherMenu(false);
    }
  };

  const getCurrentPosition = () => {
    return isOtherPosition ? otherPositions[selectedPosition] : careerPositions[selectedPosition];
  };

  return (
    <section id="career" className="career-section">
      <div className="career-heading">
        <h2>Career</h2>
      </div>
      
      <div className="career-container">
        <div className="positions-list">
          {careerPositions.map((position, index) => (
            <div
              key={index}
              className={`position-item ${index === selectedPosition ? 'selected' : ''}`}
              onClick={() => handlePositionClick(index)}
            >
              <h3>{position.title}</h3>
              <p>{position.company}</p>
              <p className="period">{position.period}</p>
            </div>
          ))}
          
          <div 
            className="other-positions-button"
            onClick={() => setShowOtherMenu(!showOtherMenu)}
          >
            Other +
          </div>

          {showOtherMenu && (
            <div className="other-positions-menu">
              <div className="other-menu-content">
                {otherPositions.map((position, index) => (
                  <div
                    key={`other-${index}`}
                    className={`position-item ${index + careerPositions.length === selectedPosition ? 'selected' : ''}`}
                    onClick={() => handlePositionClick(index, true)}
                  >
                    <h3>{position.title}</h3>
                    <p>{position.company}</p>
                    <p className="period">{position.period}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="position-details">
          <div className="details-content">
            <img 
              src={getCurrentPosition().image} 
              alt={getCurrentPosition().title}
              className="position-image"
            />
            <h3>{getCurrentPosition().title}</h3>
            <h4>{getCurrentPosition().company}</h4>
            <p>{getCurrentPosition().description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
