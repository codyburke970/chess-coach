import { Chess } from 'chess.js';

interface GameInfoProps {
  fen: string;
}

export default function GameInfo({ fen }: GameInfoProps) {
  const chess = new Chess(fen);
  const turn = chess.turn() === 'w' ? 'White' : 'Black';
  const moveNumber = Math.floor(chess.moveNumber() / 2) + 1;
  const isCheck = chess.isCheck();
  const isCheckmate = chess.isCheckmate();
  const isStalemate = chess.isStalemate();
  const isDraw = chess.isDraw();

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Game Information</h2>
      <div className="space-y-2">
        <p>Move: {moveNumber}</p>
        <p>Turn: {turn}</p>
        {isCheck && <p className="text-yellow-500">Check!</p>}
        {isCheckmate && <p className="text-red-500">Checkmate!</p>}
        {isStalemate && <p className="text-gray-500">Stalemate</p>}
        {isDraw && !isStalemate && <p className="text-gray-500">Draw</p>}
      </div>
    </div>
  );
} 