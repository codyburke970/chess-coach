import { useState, useEffect } from 'react';
import { getSavedGames, deleteSavedGame, saveGame } from '../utils/gameStorage';

interface SavedGamesProps {
  currentFen: string;
  onLoadGame: (fen: string) => void;
}

export default function SavedGames({ currentFen, onLoadGame }: SavedGamesProps) {
  const [games, setGames] = useState(getSavedGames());
  const [saveName, setSaveName] = useState('');
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  useEffect(() => {
    setGames(getSavedGames());
  }, []);

  const handleSave = () => {
    saveGame(currentFen, saveName || undefined);
    setGames(getSavedGames());
    setSaveName('');
    setShowSaveDialog(false);
  };

  const handleDelete = (timestamp: number) => {
    deleteSavedGame(timestamp);
    setGames(getSavedGames());
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Saved Games</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowSaveDialog(true)}
        >
          Save Current Game
        </button>
      </div>

      {showSaveDialog && (
        <div className="mb-4 p-4 bg-gray-700 rounded-lg">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder="Game name (optional)"
            className="w-full p-2 mb-2 bg-gray-600 text-white rounded"
          />
          <div className="flex justify-end space-x-2">
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowSaveDialog(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {games.length === 0 ? (
          <p className="text-gray-400">No saved games</p>
        ) : (
          games.map((game) => (
            <div
              key={game.timestamp}
              className="flex justify-between items-center p-3 bg-gray-700 rounded-lg"
            >
              <div>
                <h3 className="font-semibold">{game.name}</h3>
                <p className="text-sm text-gray-400">
                  {new Date(game.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => onLoadGame(game.fen)}
                >
                  Load
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  onClick={() => handleDelete(game.timestamp)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 