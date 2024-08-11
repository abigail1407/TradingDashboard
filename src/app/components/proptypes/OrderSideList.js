import React from 'react';
import PropTypes from 'prop-types';

const OrderSideList = React.memo(({ side, loading, renderOrderBookList }) => {
  const colorClass = side === 'buy' ? 'border-green-500' : 'border-red-500';

  return (
    <div className={`orders ${side}-orders relative transition-opacity duration-300 ease-in-out`}>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`w-8 h-8 border-4 border-t-4 ${colorClass} border-solid rounded-full animate-spin`}></div>
        </div>
      ) : (
        <div className="opacity-100 transition-opacity duration-300 ease-in-out">
          {renderOrderBookList(side)}
        </div>
      )}
    </div>
  );
});

// Define PropTypes for OrderSideList
OrderSideList.propTypes = {
  side: PropTypes.oneOf(['buy', 'sell']).isRequired,
  loading: PropTypes.bool.isRequired,
  renderOrderBookList: PropTypes.func.isRequired,
};

OrderSideList.displayName = 'OrderSideList';

export default OrderSideList;
