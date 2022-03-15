export interface Mine {
  x: number
  y: number
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  adjacentMines?: number
}
