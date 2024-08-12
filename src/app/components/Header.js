"use client";

import React from 'react';
import Image from 'next/image';
import TopOfBook from './TopOfBook';

const Header = ({ selectedPair, onPairChange }) => (
  <div className="header block p-4 px-8 mx-auto relative shadow-custom-shadow">
    <Image 
      className="icon inline-flex self-center mr-4" 
      src="/icon.png"
      alt="icon"
      width={40}
      height={40}
      priority
    />
    <TopOfBook selectedPair={selectedPair} onPairChange={onPairChange} />
    <Image 
      className="logo inline-flex self-center absolute right-8" 
      src="/logo.png" 
      alt="logo"
      width={200}
      height={200}
      priority
    />
  </div>
);

export default Header;
