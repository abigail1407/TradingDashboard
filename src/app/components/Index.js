"use client";
import React, { useState } from 'react';
import Header from './Header';
import Dashboard from '../components/dashboard/Dashboard';
import Footer from './Footer';
import './../styles/style.css';

const Home = () => {
  const [selectedPair, setSelectedPair] = useState('BTC-USD');

  const handlePairChange = (newPair) => {
    setSelectedPair(newPair);
  };

  return (
    <div className="App">
      <Header selectedPair={selectedPair} onPairChange={handlePairChange} />
      <Dashboard selectedPair={selectedPair} />
      <Footer />
    </div>
  );
};

export default Home;
