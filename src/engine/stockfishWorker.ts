let stockfish: Worker;

self.onmessage = (e: MessageEvent) => {
  const { type, payload } = e.data;

  switch (type) {
    case 'init':
      stockfish = new Worker('/stockfish.wasm');
      stockfish.onmessage = (e: MessageEvent) => {
        self.postMessage({ type: 'output', payload: e.data });
      };
      break;

    case 'command':
      if (stockfish) {
        stockfish.postMessage(payload);
      }
      break;

    case 'terminate':
      if (stockfish) {
        stockfish.terminate();
      }
      break;
  }
};

export {}; 