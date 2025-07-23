import './App.css'
import { Board } from './components/Board'
import toast, { Toaster } from 'react-hot-toast';

function App() {

  const notify = (solution) => toast(`Word was '${solution}'` , {style : {background: '#ced4da' , color : '#538d4e' , fontFamily : 'Poppins' , fontWeight : 'bold' , fontSize : '20px'}});
  return (
      <div className='h-screen w-screen font-poppins flex flex-col justify-center items-center relative bg-[#000000]'>
        <Toaster position='top-right' toastOptions={{duration : 3000}}/>
        <Board fn={notify}/>
      </div>
  )
}

export default App
      