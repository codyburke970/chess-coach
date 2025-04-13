export interface FenInfo {
  position: string;
  turn: 'w' | 'b';
  castling: string;
  enPassant: string;
  halfMoves: number;
  fullMoves: number;
}

export function parseFen(fen: string): FenInfo {
  const [position, turn, castling, enPassant, halfMoves, fullMoves] = fen.split(' ');
  return {
    position,
    turn: turn as 'w' | 'b',
    castling,
    enPassant,
    halfMoves: parseInt(halfMoves),
    fullMoves: parseInt(fullMoves)
  };
}

export function generateFen(info: FenInfo): string {
  return `${info.position} ${info.turn} ${info.castling} ${info.enPassant} ${info.halfMoves} ${info.fullMoves}`;
}

export function isValidFen(fen: string): boolean {
  try {
    const parts = fen.split(' ');
    if (parts.length !== 6) return false;

    const [position, turn, castling, enPassant] = parts;
    const ranks = position.split('/');
    if (ranks.length !== 8) return false;

    for (const rank of ranks) {
      let sum = 0;
      for (const char of rank) {
        if (/[1-8]/.test(char)) {
          sum += parseInt(char);
        } else if (/[prnbqkPRNBQK]/.test(char)) {
          sum += 1;
        } else {
          return false;
        }
      }
      if (sum !== 8) return false;
    }

    if (turn !== 'w' && turn !== 'b') return false;
    if (!/^[KQkq-]*$/.test(castling)) return false;
    if (!/^(-|[a-h][36])$/.test(enPassant)) return false;

    return true;
  } catch {
    return false;
  }
} 