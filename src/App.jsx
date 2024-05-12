import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import MainPage from './components/MainPage/MainPage'
import Info from './components/Info/Info'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<MainPage />} />
          <Route path={`/country/:id`} element={<Info />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
