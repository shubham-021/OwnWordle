import './App.css'
import { Board } from './components/Board'

function App() {

  return (
    <div className='h-screen w-screen flex flex-col justify-center items-center relative'>
      <Board/>
      <button 
        className='absolute right-20 top-20 bg-green-400 w-30 h-10 rounded-2xl text-white hover:cursor-pointer'
        onClick={()=>window.location.reload(true)}
        >Replay</button>
    </div>
  )
}

export default App
