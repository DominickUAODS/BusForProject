import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FooterComp from './components/footer_comp/FooterComp'
import Header from './components/hedaer_comp/Header'
import IndexComp from './components/index_comp/IndexComp'
import TestRaces from "./components/TestRaces";

function App() {


  return (
    <Router>
      <Header /> {/* Добавляем Header */}
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/races" element={<TestRaces />} />
      </Routes>
      <IndexComp /> {/* Добавляем основной контент IndexComp */}
      <FooterComp /> {/* Добавляем Footer */}
    </Router>
  )
}

export default App
