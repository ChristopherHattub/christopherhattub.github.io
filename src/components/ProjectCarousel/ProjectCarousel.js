// src/components/ProjectCarousel/ProjectCarousel.js
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CarouselItem from './CarouselItem';
import './ProjectCarousel.css';

const ProjectCarousel = ({ projects }) => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHoldingArrow, setIsHoldingArrow] = useState({ left: false, right: false });
  const carouselRef = useRef(null);
  const autoScrollPauseTimerRef = useRef(null);
  
  // Create a duplicated array of projects for seamless looping
  const duplicatedProjects = [...projects, ...projects, ...projects];

  // Function to handle scroll position for infinite loop
  const handleScrollPosition = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth } = carouselRef.current;
    const scrollEnd = scrollWidth / 3;
    
    if (scrollLeft >= scrollEnd * 2) {
      carouselRef.current.scrollLeft = scrollEnd;
    }
    else if (scrollLeft <= 0) {
      carouselRef.current.scrollLeft = scrollEnd;
    }
  };

  // Handle arrow button hold scrolling
  useEffect(() => {
    let scrollInterval;
    
    if (isHoldingArrow.left || isHoldingArrow.right) {
      scrollInterval = setInterval(() => {
        if (carouselRef.current) {
          carouselRef.current.scrollLeft += isHoldingArrow.right ? 1 : -1;
          handleScrollPosition();
        }
      }, 30);
    }

    return () => clearInterval(scrollInterval);
  }, [isHoldingArrow]);

  // Initial positioning and auto-scroll setup
  useEffect(() => {
    if (carouselRef.current) {
      // Position at the start of the middle set of items
      const scrollEnd = carouselRef.current.scrollWidth / 3;
      carouselRef.current.scrollLeft = scrollEnd;
      
      // Start auto-scrolling
      setIsAutoScrolling(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Auto-scroll functionality
  useEffect(() => {
    let scrollInterval;
    
    if (isAutoScrolling && carouselRef.current && !isHoldingArrow.left && !isHoldingArrow.right) {
      scrollInterval = setInterval(() => {
        carouselRef.current.scrollLeft += 1;
        handleScrollPosition();
      }, 30);
    }

    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling, isHoldingArrow]);

  // Mouse event handlers for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle arrow click and temporary pause
  const handleArrowClick = (direction) => {
    // Clear any existing timer
    if (autoScrollPauseTimerRef.current) {
      clearTimeout(autoScrollPauseTimerRef.current);
    }

    // Pause auto-scroll
    setIsAutoScrolling(false);

    // Resume auto-scroll after 3 seconds
    autoScrollPauseTimerRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 3000);

    // Perform the scroll
    const scrollAmount = carouselRef.current.clientWidth * 0.8;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      handleScrollPosition();
    }, 500);
  };

  return (
    <div className="carousel-container">
      <button 
        className="nav-button nav-button-left" 
        onClick={() => handleArrowClick(-1)}
        onMouseDown={() => setIsHoldingArrow({ left: true, right: false })}
        onMouseUp={() => setIsHoldingArrow({ left: false, right: false })}
        onMouseLeave={() => setIsHoldingArrow({ left: false, right: false })}
        onTouchStart={() => setIsHoldingArrow({ left: true, right: false })}
        onTouchEnd={() => setIsHoldingArrow({ left: false, right: false })}
        aria-label="Previous projects"
      >
        <ChevronLeft className="nav-icon" />
      </button>

      <div
        className="projects-carousel"
        ref={carouselRef}
        onMouseEnter={() => setIsAutoScrolling(false)}
        onMouseLeave={() => {
          setIsAutoScrolling(true);
          handleMouseUp();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onScroll={() => {
          if (!isDragging) {
            handleScrollPosition();
          }
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <CarouselItem key={`${project.id}-${index}`} project={project} />
        ))}
      </div>

      <button 
        className="nav-button nav-button-right"
        onClick={() => handleArrowClick(1)}
        onMouseDown={() => setIsHoldingArrow({ left: false, right: true })}
        onMouseUp={() => setIsHoldingArrow({ left: false, right: false })}
        onMouseLeave={() => setIsHoldingArrow({ left: false, right: false })}
        onTouchStart={() => setIsHoldingArrow({ left: false, right: true })}
        onTouchEnd={() => setIsHoldingArrow({ left: false, right: false })}
        aria-label="Next projects"
      >
        <ChevronRight className="nav-icon" />
      </button>
    </div>
  );
};

export default ProjectCarousel;