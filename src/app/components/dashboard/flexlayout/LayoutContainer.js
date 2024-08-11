import React from 'react';
import { Layout, Model } from 'flexlayout-react';
import 'flexlayout-react/style/dark.css';
import layoutConfig from './layoutConfig.json'; // Your layout configuration
import OrderBook from '../OrderBook';
import PriceChart from '../PriceChart';

const LayoutContainer = ({ selectedPair }) => {
  // Factory function to render components based on layout config
  const factory = (node) => {
    const component = node.getComponent();
    switch (component) {
      case 'PriceChart':
        return <PriceChart symbol={selectedPair.replace('-', '')} />;
      case 'OrderBook':
        return <OrderBook pair={selectedPair} />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div className="dashboard-content c-gray">
      <Layout
        model={Model.fromJson(layoutConfig)} // Initialize the layout model with the config
        factory={factory} // Component factory function
      />
    </div>
  );
};

export default LayoutContainer;
