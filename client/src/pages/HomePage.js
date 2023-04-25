import React from 'react';

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-page-bg"></div>
      <h1>Welcome to</h1>
      <div className="image-container">
        <img
          src="https://as1.ftcdn.net/v2/jpg/01/82/57/16/1000_F_182571644_N4ShAMnFXbNOdip1NIOLdZyo61kmTACg.jpg"
          alt="My Chat App"
        />
        <h1>Penguin Chat</h1>
      </div>
    </div>
  );
}

export default HomePage;
