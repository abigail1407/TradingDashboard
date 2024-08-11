import React from 'react';
import { Layout, Model } from 'flexlayout-react';
import 'flexlayout-react/style/dark.css';
import layoutConfig from './layoutConfig.json'; 
import OrderBook from '../OrderBook';
import PriceChart from '../PriceChart';

const LayoutContainer = ({ selectedPair }) => {
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
        model={Model.fromJson(layoutConfig)}
        factory={factory}
      />
    </div>
  );
};

export default LayoutContainer;
