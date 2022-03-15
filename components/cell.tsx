import classNames from 'classnames'
import { Mine } from '../types'

const numberColors = [
  '#e6194b',
  '#3cb44b',
  '#ffe119',
  '#4363d8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#bcf60c',
]

export default function Cell({
  cell,
  onClick,
  onContextMenu,
}: {
  cell: Mine
  onClick: () => void
  onContextMenu: () => void
}) {
  const renderContent = () => {
    if (cell.isRevealed) {
      if (cell.isMine) {
        return (
          <span className="flex h-full w-full items-center justify-center bg-red-300 text-red-600">
            💣
          </span>
        )
      }

      return (
        <span
          className="flex h-full w-full items-center justify-center bg-white"
          style={{
            color: numberColors[cell.adjacentMines || 0],
          }}
        >
          {cell.adjacentMines || null}
        </span>
      )
    }

    return (
      <button
        onClick={() => {
          if (cell.isFlagged) {
            return
          }
          onClick && onClick()
        }}
        className={classNames(
          'h-full w-full transition-colors duration-300 ease-in-out group-hover:bg-gray-300/40'
        )}
        onContextMenu={(evt) => {
          evt.preventDefault()
          onContextMenu && onContextMenu()
        }}
      >
        {cell.isFlagged ? <span>🚩</span> : null}
      </button>
    )
  }

  return (
    <div className="group h-7 w-7 border bg-gray-200/30 md:h-10 md:w-10">
      {renderContent()}
    </div>
  )
}
