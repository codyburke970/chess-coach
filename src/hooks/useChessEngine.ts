import { useEffect, useRef, useCallback } from 'react';

interface EngineOutput {
  type: 'info' | 'bestmove';
  data: string;
}

export function useChessEngine() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../engine/stockfishWorker.ts', import.meta.url),
      { type: 'module' }
    );

    workerRef.current.postMessage({ type: 'init' });

    return () => {
      if (workerRef.current) {
        workerRef.current.postMessage({ type: 'terminate' });
        workerRef.current.terminate();
      }
    };
  }, []);

  const sendCommand = useCallback((command: string) => {
    if (workerRef.current) {
      workerRef.current.postMessage({ type: 'command', payload: command });
    }
  }, []);

  const analyze = useCallback((fen: string, depth: number = 20) => {
    return new Promise<EngineOutput>((resolve) => {
      if (!workerRef.current) return;

      const handleMessage = (e: MessageEvent) => {
        const { type, payload } = e.data;
        if (type === 'output') {
          const output = payload as string;
          if (output.startsWith('info')) {
            resolve({ type: 'info', data: output });
          } else if (output.startsWith('bestmove')) {
            resolve({ type: 'bestmove', data: output });
            workerRef.current?.removeEventListener('message', handleMessage);
          }
        }
      };

      workerRef.current.addEventListener('message', handleMessage);
      sendCommand('position fen ' + fen);
      sendCommand('go depth ' + depth);
    });
  }, [sendCommand]);

  return { analyze, sendCommand };
} 