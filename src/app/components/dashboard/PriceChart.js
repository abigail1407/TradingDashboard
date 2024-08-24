"use client";
import React, { useEffect, useRef } from 'react';

const PriceChart = ({ symbol }) => {
  const container = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;

    const widgetConfig = {
      autosize: true,
      symbol: symbol || 'BTC-USD',
      interval: 'D',
      timezone: 'exchange',
      theme: 'dark',
      style: '1',
      locale: 'en',
      backgroundColor: '#171B26',
      gridColor: 'rgba(14, 32, 50, 0.06)',
      allow_symbol_change: false,
      withdateranges: 'true',
      range: '12M',
      calendar: false,
      support_host: 'https://www.tradingview.com',
    };

    script.innerHTML = JSON.stringify(widgetConfig);

    const currentContainer = container.current;

    if (currentContainer) {
      currentContainer.innerHTML = '';
      currentContainer.appendChild(script);
    }
    return () => {
      if (currentContainer) {
        currentContainer.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="price-chart">
      <div className="tradingview-widget-container" ref={container}>
        <div className="tradingview-widget-container__widget"></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener noreferrer" target="_blank">
          </a>
        </div>
      </div>
    </div>
  );
};

export default PriceChart;
