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
    />
    <TopOfBook selectedPair={selectedPair} onPairChange={onPairChange} />
  </div>
);

export default Header;
