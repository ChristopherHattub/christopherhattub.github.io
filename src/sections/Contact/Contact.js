import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set visible after component mounts to trigger animations
    setIsVisible(true);
  }, []);

  return (
    <section id="contact" className="contact-section min-h-screen flex items-center justify-center py-16">
      <div className="contact-container">
        {/* Background Shapes */}
        <div className={`background-circle ${isVisible ? 'animate' : ''}`}></div>
        
        <div className="columns-wrapper">
          {/* Left Column with Background */}
          <div className="background-rectangle background-rectangle-left"></div>
          <div className="flex-1 text-container">
            <div className="text-section">
              <h2 className="text-2xl font-bold mb-2">Name</h2>
              <p className="text-1g">Christopher Hattub</p>
            </div>
            <div className="text-section">
              <h2 className="text-2xl font-bold mb-2">Email</h2>
              <div className="flex items-center justify-center lg:justify-end gap-4">
                <Mail className="w-5 h-5" />
                <a href="mailto:chris.hattub@gmail.com" className="text-lg hover:text-[#F59D16] transition-colors">
                  chris.hattub@gmail.com 
                </a>
              </div>
            </div>
          </div>

          {/* Center Column - Profile Picture */}
          <div className="flex-shrink-0">
            <div className={`profile-container ${isVisible ? 'animate' : ''}`}>
              <div className="profile-background"></div>
              <img
                src="/assets/profile-picture.jpg"
                alt="Profile"
                className={`profile-image ${!imageLoaded ? 'loading' : ''}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>
          </div>

          {/* Right Column with Background */}
          <div className="background-rectangle background-rectangle-right"></div>
          <div className="flex-1 text-container">
            <div className="text-section">
              <h2 className="text-2xl font-bold mb-2">Location</h2>
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin className="w-5 h-5" />
                <p className="text-lg">New Hampshire Seacoast Area</p>
              </div>
            </div>
            <div className="text-section">
              <h2 className="text-2xl font-bold mb-2">Social</h2>
              <div className="flex items-center justify-center lg:justify-start gap-4">
                <a
                  href="https://github.com/ChristopherHattub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link hover:text-[#F59D16] transition-colors"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/christopher-hattub-558926201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link hover:text-[#F59D16] transition-colors"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;