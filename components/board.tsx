import { useEffect, useState } from 'react'
import { expandEmptyCells, generateBoard, showAllMines } from '../util/shared'
import Cell from './cell'

function Time({ startTime, status }: { startTime: number; status: string }) {
  const [_, update] = useState({})

  const t = Math.floor((Date.now() - startTime) / 1e3)

  useEffect(() => {
    if (status == 'finished') {
      return
    }
    const timer = setInterval(() => {
      update({})
    }, 1e3)
    return () => {
      clearInterval(timer)
    }
  }, [status])

  return <span>{t}</span>
}

const MINE_NUMBER = 10

export default function Board() {
  const [board, setBoard] = useState(generateBoard(10, 10, MINE_NUMBER))
  const [time, setTime] = useState(Date.now())
  const [status, setStatus] = useState('playing')

  useEffect(() => {
    const cells = board.flat()
    const mines = cells.filter((cell) => cell.isMine)
    const isFailed = mines.some((cell) => cell.isRevealed)
    const isSuccess = mines.every((cell) => cell.isFlagged)

    if (isFailed) {
      alert('You lose!')
      setStatus('finished')
      showAllMines(board)
    }
    if (isSuccess) {
      alert('You win!')
      setStatus('finished')
    }
  }, [board])

  const restart = () => {
    setStatus('playing')
    setBoard(generateBoard(10, 10, 10))
    setTime(Date.now())
  }

  return (
    <div>
      <div className="mb-5 text-center">
        <button
          className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none"
          onClick={restart}
        >
          New Game
        </button>
      </div>
      <div className="mb-5 space-x-10 text-center font-mono text-2xl text-green-300">
        <span>
          ⏰ <Time status={status} startTime={time} />
        </span>
        <span>💣 {MINE_NUMBER}</span>
      </div>
      <div
        onContextMenu={(evt) => {
          evt.preventDefault()
        }}
        className="relative inline-flex flex-col gap-1 border p-2"
      >
        {status != 'playing' && (
          <div className="absolute top-0 left-0 bottom-0 right-0"></div>
        )}
        {board.map((row, i) => (
          <div className="flex gap-1" key={i}>
            {row.map((cell, j) => (
              <Cell
                onClick={() => {
                  const currentItem = board[i][j]
                  currentItem.isRevealed = true
                  expandEmptyCells(currentItem, board)
                  setBoard([...board])
                }}
                onContextMenu={() => {
                  const len = board.flat().filter((i) => i.isFlagged).length
                  const currentItem = board[i][j]

                  if (len >= MINE_NUMBER && !currentItem.isFlagged) {
                    return
                  }

                  currentItem.isFlagged = !currentItem.isFlagged
                  setBoard([...board])
                }}
                key={j}
                cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
