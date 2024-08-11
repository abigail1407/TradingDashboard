import React from 'react';
import PropTypes from 'prop-types';

const DataDisplay = ({ 
  title, 
  value, 
  formatNumber = true, 
  prefix = '', 
  colorClass = '', 
  conData = '' 
}) => {
  return (
    <div className={`data-container text-left ${conData}`}>
      <div className="title block text-[10px]">{title}</div>
      <span className={`value text-[20px] font-bold ${colorClass}`}>
        {formatNumber ? `${prefix}${Number(value).toLocaleString()}` : `${prefix}${value}`}
      </span>
    </div>
  );
};

DataDisplay.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  formatNumber: PropTypes.bool,
  prefix: PropTypes.string,
  colorClass: PropTypes.string,
  conData: PropTypes.string,
};

export default DataDisplay;
