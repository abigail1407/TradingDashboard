const WS_URL = 'wss://ws-feed.exchange.coinbase.com/';
const RECONNECT_DELAY = 1000;

export const connectToSocket = (pair, handleUpdate) => {
  let ws;

  const connect = () => {
    ws = new WebSocket(WS_URL);

    ws.addEventListener('open', onOpen);
    ws.addEventListener('message', onMessage);
    ws.addEventListener('error', onError);
    ws.addEventListener('close', onClose);
  };

  const onOpen = () => {
    ws.send(JSON.stringify({
      type: 'subscribe',
      channels: ['ticker', 'level2_batch'],
      product_ids: [pair],
    }));

    console.log('WebSocket connection established');
  };

  const onMessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleUpdate(data);
    } catch (error) {
      console.error('Failed to parse WebSocket message:', error);
    }
  };

  const onError = (error) => {
    console.error('WebSocket Error:', error.message);
  };

  const onClose = () => {
    console.log('WebSocket connection closed. Attempting to reconnect...');
    setTimeout(() => {
      connect();
    }, RECONNECT_DELAY);
  };

  connect();

  return () => {
    ws.removeEventListener('open', onOpen);
    ws.removeEventListener('message', onMessage);
    ws.removeEventListener('error', onError);
    ws.removeEventListener('close', onClose);
    ws.close();
  };
};