import dynamic from 'next/dynamic'

export const Board = dynamic(() => import('./board'), { ssr: false })
