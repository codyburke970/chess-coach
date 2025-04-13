import { Square as ChessSquare } from 'chess.js';

interface SquareProps {
  piece: string | null;
  isBlack: boolean;
  isSelected: boolean;
  isValidMove: boolean;
  isLastMoveFrom: boolean;
  isLastMoveTo: boolean;
  position: ChessSquare;
  onSquareClick: (position: ChessSquare) => void;
}

export default function Square({ 
  piece, 
  isBlack, 
  isSelected, 
  isValidMove,
  isLastMoveFrom,
  isLastMoveTo, 
  position, 
  onSquareClick 
}: SquareProps) {
  const squareColor = isBlack ? 'bg-gray-600' : 'bg-gray-300';
  const selectedClass = isSelected ? 'ring-2 ring-blue-500' : '';
  const validMoveClass = isValidMove ? 'after:content-[""] after:absolute after:w-3 after:h-3 after:bg-blue-500 after:rounded-full after:opacity-50' : '';
  const lastMoveClass = isLastMoveFrom || isLastMoveTo ? 'bg-yellow-200 bg-opacity-20' : '';

  return (
    <div 
      className={`relative aspect-square ${squareColor} ${selectedClass} ${validMoveClass} ${lastMoveClass} flex items-center justify-center cursor-pointer transition-colors duration-200`}
      onClick={() => onSquareClick(position)}
    >
      {piece && (
        <img 
          src={`/assets/pieces/${piece}.svg`} 
          alt={piece} 
          className="w-4/5 h-4/5 pointer-events-none transition-transform duration-200 hover:scale-110"
        />
      )}
    </div>
  );
} 