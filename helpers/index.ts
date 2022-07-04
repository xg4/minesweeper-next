import { Mine } from '../types'

// 方向
const directions = [
  { x: -1, y: -1 },
  { x: -1, y: 0 },
  { x: -1, y: 1 },
  { x: 0, y: -1 },
  { x: 0, y: 1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
]

export function showAllMines(cells: Mine[][]) {
  cells.forEach((row) =>
    row.forEach((cell) => {
      if (cell.isMine) {
        cell.isRevealed = true
      }
    })
  )
}

export function getSiblings(cell: Mine, cells: Mine[][]) {
  const { x, y } = cell
  return directions
    .map(({ x: dx, y: dy }) => cells[y + dy] && cells[y + dy][x + dx])
    .filter(Boolean)
}

export function expandEmptyCells(cell: Mine, cells: Mine[][]) {
  if (cell.adjacentMines || cell.isMine) {
    return
  }

  const siblings = getSiblings(cell, cells)

  siblings.forEach((sibling) => {
    if (sibling.isRevealed || sibling.isFlagged) {
      return
    }
    sibling.isRevealed = true
    expandEmptyCells(sibling, cells)
  })
}

// generate minesweeper table
export function generateBoard(
  rows: number,
  cols: number,
  mines: number
): Mine[][] {
  const board: Mine[][] = []
  for (let i = 0; i < rows; i++) {
    const row = []
    for (let j = 0; j < cols; j++) {
      row.push({
        x: j,
        y: i,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
      })
    }
    board.push(row)
  }

  // place mines
  let placedMines = 0
  while (placedMines < mines) {
    const randomRow = Math.floor(Math.random() * rows)
    const randomCol = Math.floor(Math.random() * cols)
    const cell = board[randomRow][randomCol]
    if (!cell.isMine) {
      cell.isMine = true
      placedMines++
    }
  }

  board.flat().forEach((cell) => {
    if (!cell.isMine) {
      cell.adjacentMines = directions.reduce(
        (acc, { x, y }) =>
          acc + (board[cell.y + y]?.[cell.x + x]?.isMine ? 1 : 0),
        0
      )
    }
  })

  return board
}
