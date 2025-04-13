interface SavedGame {
  fen: string;
  timestamp: number;
  name: string;
}

const STORAGE_KEY = 'chess-coach-saved-games';

export function saveGame(fen: string, name: string = new Date().toLocaleString()): void {
  const savedGames = getSavedGames();
  const newGame: SavedGame = {
    fen,
    timestamp: Date.now(),
    name
  };
  
  savedGames.push(newGame);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames));
}

export function getSavedGames(): SavedGame[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading saved games:', error);
    return [];
  }
}

export function deleteSavedGame(timestamp: number): void {
  const savedGames = getSavedGames().filter(game => game.timestamp !== timestamp);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(savedGames));
}

export function clearSavedGames(): void {
  localStorage.removeItem(STORAGE_KEY);
} 