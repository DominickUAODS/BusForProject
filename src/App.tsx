import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import FooterComp from './components/footer_comp/FooterComp'
import Header from './components/hedaer_comp/Header'
import IndexComp from './components/index_comp/IndexComp'
import RacesComp from "./components/races_comp/RacesComp";

function App() {


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<IndexComp />} />
        <Route path="/races" element={<RacesComp />} />
      </Routes>
      <FooterComp />
    </Router>
  )
}

export default App
