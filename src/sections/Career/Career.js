import React, { useState, useEffect } from 'react';
import './Career.css';

const Career = () => {
  const [selectedPosition, setSelectedPosition] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const [isOtherPosition, setIsOtherPosition] = useState(false);
  
  const careerPositions = [
    {
      title: "Dedicated RPG Programmer and Software Systems Developer",
      company: "Fall River Florist Supply",
      period: "2023 - 2025",
      description: `Specialized in streamlining wholesale operations through custom software enhancements. Proven success in automating inventory tracking and order processing using RPG IV and CL, resulting in a 30% reduction in manual data entry and improved shipping accuracy.
Engineered and deployed full‑stack web application features using modern frameworks(React.js,Node.js) to enhance customer engagement and streamline the online ordering process.
      
      A local company in my hometown where I worked as a systems programmer and web developer. .I started as a warehouse worker in highschool, then a van driver and eventually their IT Systems Devloper once I graduated college. I played a big part in designing the companys website and internal RPG database system.`,
      image: "/assets/career-images/fall-river-florist-supply.jpeg"
    },
    {
      title: "Hardware Test Engineer",
      company: "UNH InterOperability Laboratory",
      period: "Nov 2019 – Nov 2021",
      description: `Performed conformance, interoperability, and certification testing for third‑party network hardware and software, ensuring compliance with industry standards (IEEE, IETF, and others).

      • Executed internet conformance and interoperability certification testing for third-party network hardware
        and software.
      
      • Co-led a 5-person team in developing specifications, test plans, Agile storyboards, and test scripts.
      
      • Maintained daily communication with vendors to provide updates, implement changes, and guarantee
        customer success.`,
      image: "/assets/career-images/unhIOL.png"
    },
    
    
  ];

  const otherPositions = [
   
    {
      title: "Crew Member",
      company: "Jersey Mike's",
      period: "2022 - 2023",
      description: "Prepared high-quality sandwiches while ensuring customer satisfaction. Maintained food safety standards and handled cash transactions accurately.",
      image: "/assets/career-images/jersey-mikes.jpeg"
    },
    {
      title: "Warehouse Worker/Van Driver",
      company: "Fall River Florist Supply",
      period: "2015-2017",
      description: "Assisted customers with electronics purchases and provided technical support. Maintained product knowledge to offer informed recommendations.",
      image: "/assets/career-images/fall-river-florist-supply.jpeg"
    },
    {
        title: "Crew Member",
        company: "Dunkin' Donuts",
        period: "2015 - 2019",
        description: "Provided excellent customer service in a fast-paced environment. Managed food preparation, cash handling, and store cleanliness while maintaining efficiency during peak hours.",
        image: "/assets/career-images/dunkin-donuts.jpg"
    },
    {
      title: "Camp Counselor",
      company: "Summer Youth Program",
      period: "2014-2015",
      description: "Led activities and supervised groups of children. Developed and implemented educational and recreational programs.",
      image: "/assets/career-images/camp.png"
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
  }, [isAutoScrolling, showOtherMenu, isOtherPosition, careerPositions.length]);

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
