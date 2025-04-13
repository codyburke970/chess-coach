import { useState, useEffect } from 'react';
import { Chess, Move, Square as ChessSquare } from 'chess.js';
import Square from './Square';
import { useChessSound } from '../hooks/useChessSound';

interface BoardProps {
  fen: string;
  onMove: (fen: string) => void;
}

export default function Board({ fen, onMove }: BoardProps) {
  const [chess] = useState(new Chess(fen));
  const [selectedSquare, setSelectedSquare] = useState<ChessSquare | null>(null);
  const [validMoves, setValidMoves] = useState<ChessSquare[]>([]);
  const [lastMove, setLastMove] = useState<{ from: ChessSquare; to: ChessSquare } | null>(null);
  const { playSound } = useChessSound();

  useEffect(() => {
    chess.load(fen);
  }, [fen, chess]);

  const handleSquareClick = (square: ChessSquare) => {
    if (selectedSquare === null) {
      const moves = chess.moves({ square, verbose: true }) as Move[];
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves.map(move => move.to as ChessSquare));
      }
    } else {
      if (validMoves.includes(square)) {
        try {
          const move = chess.move({ from: selectedSquare, to: square });
          setLastMove({ from: selectedSquare, to: square });
          
          // Play appropriate sound
          if (move.captured) {
            playSound('capture');
          } else if (move.san.includes('O-O')) {
            playSound('castle');
          } else if (move.san.includes('=')) {
            playSound('promote');
          } else {
            playSound('move');
          }

          if (chess.isCheck()) {
            setTimeout(() => playSound('check'), 150);
          }

          if (chess.isGameOver()) {
            setTimeout(() => playSound('gameEnd'), 300);
          }

          onMove(chess.fen());
        } catch (error) {
          console.error('Invalid move:', error);
        }
      }
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const renderBoard = () => {
    const board = chess.board();
    const squares = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const piece = board[i][j];
        const position = `${String.fromCharCode(97 + j)}${8 - i}` as ChessSquare;
        const isBlack = (i + j) % 2 === 1;
        const isLastMoveFrom = lastMove?.from === position;
        const isLastMoveTo = lastMove?.to === position;
        
        squares.push(
          <Square
            key={position}
            piece={piece ? `${piece.color}${piece.type}` : null}
            isBlack={isBlack}
            isSelected={position === selectedSquare}
            isValidMove={validMoves.includes(position)}
            isLastMoveFrom={isLastMoveFrom}
            isLastMoveTo={isLastMoveTo}
            position={position}
            onSquareClick={handleSquareClick}
          />
        );
      }
    }

    return squares;
  };

  return (
    <div className="aspect-square bg-white rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-8 gap-0 h-full">
        {renderBoard()}
      </div>
    </div>
  );
} 