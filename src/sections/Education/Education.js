import React, { useState } from 'react';
import './Education.css';

const Education = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="education" className="education-section min-h-screen flex items-center justify-center py-16 bg-white">
      {/* Add background shapes */}
      <div className="education-header-shape"></div>
      <div className="education-content-shape"></div>

      {/* Wrap existing content in education-container for proper z-indexing */}
      <div className="education-container container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Desktop: side-by-side, Mobile: stacked */}
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Featured Image */}
            <div className="w-full lg:w-1/2 education-image">
              <div className="education-image-container relative overflow-hidden rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-[#F59D16] opacity-20" />
                <img
                  src="/assets/kingsbury-hall.jpg"
                  alt="Education Background"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="w-8 h-8 border-4 border-[#F59D16] border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-6 education-content">
              <div className="text-left">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Educational Background</h2>
                <div className="space-y-8">
                  {/* University Education */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-[#F59D16]">University Degree</h3>
                    <p className="text-lg text-gray-700">Bachelor of Science in Computer Science</p>
                    <p className="text-gray-600">University of New Hampshire, 2018-2023</p>
                    <p className="text-gray-600">
                      Relevant coursework in software development, algorithms, and data structures.
        
                    </p>
                  </div>

                  {/* Additional Certifications */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-[#F59D16]">.</h3>
                    <ul className="space-y-4">
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;