import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import RoutesContent from './router/RoutesContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ height: '100px' }}/>
        <p>Hello React SSR !</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <div className='App-content'>
        <RoutesContent />
      </div>
    </div>
  )
}


export default App
