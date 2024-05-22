// src/pages/HomePage.jsx
import React from 'react';
import './styles/HomePage.css'; // Adjust the import path if needed

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="home-left">
        <img src="/assets/images/Christopher_Hattub_Resume_2024-2.jpg" alt="Profile" className="profile-picture" />
      </div>
      <div className="home-right">
        <p className="welcome-message">
          Welcome to my website! Here, you'll find my interactive resume, projects, and more. I am excited to share my work and experiences with you. Feel free to explore and learn more about my journey.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
