import React, { useState } from 'react'
import logo from './logo.svg'
import styles from './App.module.less'
import RoutesContent from './router/RoutesContent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles['app']}>
      <header className={styles['app-header']}>
        <img
          src={logo}
          className={styles['app-logo']}
          alt="logo"
          style={{ height: '100px' }}
        />
        <p>Hello React SSR !</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
      </header>
      <div className={styles['app-content']}>
        <RoutesContent />
      </div>
    </div>
  )
}

export default App
