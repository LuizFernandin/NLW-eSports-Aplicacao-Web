import './styles/main.css'

import logoImg from './assets/logo-nlw-esports.svg'
import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdModal } from './components/CreateAdModal'

interface Game {
  id: string,
  bannerUrl: string,
  title: string,
  _count: {
    ads: number,
  },
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-clip-text bg-nlw-gradient'>duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(games => {
          return (
            <GameBanner 
              bannerUrl={games.bannerUrl} 
              title={games.title} 
              adsCount={games._count.ads} 
              key={games.id}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
