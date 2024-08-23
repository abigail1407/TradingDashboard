"use client";
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { connectToSocket } from './coinbaseWebSocket';
import defaultIcon from '../icons/BTC-USD.png';
import DataDisplay from '../components/proptypes/DataDisplay';
import axios from 'axios';

const TopOfBook = ({ onPairChange }) => {
  const [selectedPair, setSelectedPair] = useState('BTC-USD');
  const [tickerData, setTickerData] = useState({
    bestBid: null,
    bestAsk: null,
    bestBidSize: null,
    bestAskSize: null,
    spread: null,
    volume24h: null,
  });
  const [options, setPairOptions] = useState([]);

  const handleUpdate = useCallback((data) => {
    if (data.type === 'ticker') {
      const bestBid = parseFloat(data.best_bid);
      const bestAsk = parseFloat(data.best_ask);
      setTickerData({
        bestBid,
        bestAsk,
        bestBidSize: parseFloat(data.best_bid_size),
        bestAskSize: parseFloat(data.best_ask_size),
        spread: bestAsk - bestBid,
        volume24h: parseFloat(data.volume_24h),
      });
    }
  }, []);

  useEffect(() => {
    axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.exchange.coinbase.com/products',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      const ids = response.data.map(item => item.id).sort();
      setPairOptions(ids);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    if (!selectedPair) return;

    const cleanup = connectToSocket(selectedPair, handleUpdate);

    return () => cleanup();
  }, [selectedPair, handleUpdate]);

  const handleChange = (event) => {
    const newPair = event.target.value;
    setSelectedPair(newPair);
    if (onPairChange) onPairChange(newPair);
  };

  const getIconSrc = (pair) => {
    try {
      return require(`../icons/${pair}.png`).default;
    } catch {
      return defaultIcon;
    }
  };

  const getSpreadColorClass = () => {
    if (tickerData.spread === null) return 'text-gray';
    return tickerData.spread < 1 ? 'text-green' : 'text-red';
  };

  return (
    <div className="top-of-book flex">
      <div className="top-con w-full max-w-sm flex items-center">
        <div className="select-container flex">
          <div className="select-icon">
            <Image
              src={getIconSrc(selectedPair)}
              alt={`Icon for ${selectedPair}`}
              width={50}
              height={50}
              className="mr-2"
            />
          </div>
          <select
            id="pair-select"
            name="pair"
            value={selectedPair}
            onChange={handleChange}
            className="select-box"
          >
            {options.map((pair) => (
              <option key={pair} value={pair}>{pair}</option>
            ))}
          </select>
        </div>

        <div className="book-data ml-16 flex">
          <div className="dis-con">
            <DataDisplay
              conData={'w-150'}
              title="Best Bid"
              value={tickerData.bestBid}
              prefix="$"
              colorClass={'text-green w-150'}
            />
            <DataDisplay
              conData={'w-80'}
              title="Size"
              value={tickerData.bestBidSize}
              colorClass={'text-green w-80'}
            />
          </div>
          <div className="dis-con">
            <DataDisplay
              conData={'w-150'}
              title="Best Ask"
              value={tickerData.bestAsk}
              prefix="$"
              colorClass={'text-red'}
            />
            <DataDisplay
              conData={'w-80'}
              title="Size"
              value={tickerData.bestAskSize}
              colorClass={'text-red'}
            />
          </div>
          <div className="dis-con">
            <DataDisplay
              conData={'w-80'}
              title="Spread"
              value={tickerData.spread !== null ? tickerData.spread.toFixed(2) : ''}
              formatNumber={false}
              colorClass={getSpreadColorClass()}
            />
            <DataDisplay
              conData={'w-150'}
              title="24-Hour Volume"
              value={tickerData.volume24h}
              colorClass={'text-orange'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TopOfBook.propTypes = {
  onPairChange: PropTypes.func,
};

export default TopOfBook;
