import type { NextPage } from 'next'
import { Board } from '../components'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center pt-10">
      <h1 className="mb-5 font-bold">Minesweeper</h1>
      <Board />
    </div>
  )
}

export default Home
