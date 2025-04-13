import { useState, useEffect } from 'react';
import { useChessEngine } from '../hooks/useChessEngine';

interface CoachPanelProps {
  fen: string;
}

export default function CoachPanel({ fen }: CoachPanelProps) {
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { analyze } = useChessEngine();

  useEffect(() => {
    let isMounted = true;

    const analyzePosition = async () => {
      setIsAnalyzing(true);
      try {
        const result = await analyze(fen);
        if (isMounted) {
          if (result.type === 'info') {
            const match = result.data.match(/score cp (-?\d+)/);
            const evaluation = match ? parseInt(match[1]) / 100 : 0;
            setAnalysis(`Evaluation: ${evaluation > 0 ? '+' : ''}${evaluation}`);
          }
        }
      } catch (error) {
        console.error('Analysis error:', error);
      } finally {
        if (isMounted) {
          setIsAnalyzing(false);
        }
      }
    };

    analyzePosition();

    return () => {
      isMounted = false;
    };
  }, [fen, analyze]);

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Coach Analysis</h2>
      <div className="space-y-4">
        {isAnalyzing ? (
          <p>Analyzing position...</p>
        ) : (
          <>
            <p>{analysis}</p>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setIsAnalyzing(true)}
            >
              Analyze Deeper
            </button>
          </>
        )}
      </div>
    </div>
  );
} 