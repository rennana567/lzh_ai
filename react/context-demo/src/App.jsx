import { useState } from 'react'
import './App.css'
import Page from './components/Page'
import { ThemeContext } from './ThemeContext'

function App() {
  const [theme, setTheme] = useState('light')
  console.log(ThemeContext,'///')
  return (
    <>
      <ThemeContext.Provider value={theme}>
        <Page />
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换主题</button>
      </ThemeContext.Provider>
      
      {/* <Parent>
        <Child>
          <GrandChild>
            <GrandGrandChild></GrandGrandChild>
          </GrandChild>
        </Child>
      </Parent> */}
    </>
  )
}

export default App
