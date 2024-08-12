import React from 'react';
import LayoutContainer from './flexlayout/LayoutContainer'; // Make sure the path is correct

const Dashboard = ({ selectedPair }) => {
  return (
    <div className="dashboard">
      <div className="w-full flex justify-center">
        <LayoutContainer selectedPair={selectedPair} />
      </div>
    </div>
  );
};

export default Dashboard;