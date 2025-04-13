export default function Header() {
  return (
    <header className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Chess Coach</h1>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/codyburke970/chess-coach" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a 
              href="https://www.chess.com/learn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Learn Chess
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 