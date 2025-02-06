import React, { useState } from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="contact" className="contact-section min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Three column layout */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
            {/* Left Column */}
            <div className="flex-1 text-container space-y-6">
              <div className="text-center lg:text-right">
                <h2 className="text-2xl font-bold mb-2">Name</h2>
                <p className="text-lg">Christopher Hattub</p>
              </div>
              <div className="text-center lg:text-right">
                <h2 className="text-2xl font-bold mb-2">Email</h2>
                <div className="flex items-center justify-center lg:justify-end gap-16">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:chris.hattub@gmail.com" className="text-lg hover:text-[#F59D16] transition-colors">
                    chris.hattub@gmail.com 
                  </a>
                </div>
              </div>
            </div>

            {/* Center Column - Profile Picture */}
            <div className="flex-shrink-0 mx-4">
              <div className="profile-container">
                <div className="profile-background absolute inset-0 bg-[#F59D16] rounded-full transform scale-110 -z-10" />
                <img
                  src="/assets/profile-picture.jpg"
                  alt="Profile"
                  className={`profile-image ${!imageLoaded ? 'loading' : ''}`}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 text-container space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold mb-2">Location</h2>
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <MapPin className="w-5 h-5" />
                  <p className="text-lg">Greater Boston Area</p>
                </div>
              </div>
              <div className="text-center lg:text-left">
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
      </div>
    </section>
  );
};

export default Contact;