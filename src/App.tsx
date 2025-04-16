import { useState } from 'react'
import Header from './components/Header'
import Board from './components/Board'
import CoachPanel from './components/CoachPanel'
import GameInfo from './components/GameInfo'
import SavedGames from './components/SavedGames'

function App() {
  const [fen, setFen] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Board fen={fen} onMove={setFen} />
          </div>
          <div className="space-y-8">
            <CoachPanel fen={fen} />
            <GameInfo fen={fen} />
            <SavedGames currentFen={fen} onLoadGame={setFen} />
          </div>
      </div>
      </main>
      </div>
  )
}

export default App
