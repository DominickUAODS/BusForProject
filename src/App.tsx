import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FooterComp from './components/footer_comp/FooterComp'
import Header from './components/hedaer_comp/Header'
import IndexComp from './components/index_comp/IndexComp'

function App() {


  return (
    <Router>
      <Header /> {/* Добавляем Header */}
      <Routes>
        {/* todo */}
      </Routes>
      <IndexComp /> {/* Добавляем основной контент IndexComp */}
      <FooterComp /> {/* Добавляем Footer */}
    </Router>
  )
}

export default App
