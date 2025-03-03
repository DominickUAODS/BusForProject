import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import IndexComp from './main_components/Index';
import RegisterComp from './components/userpg_comp/RegisterComp';
import UserPageHistoryComp from './components/userpg_comp/UserPageHistoryComp';
import TestRaces from "./components/TestRaces";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexComp />} />   
        <Route path="/new/account" element={<RegisterComp />} />  
        <Route path ="/new/account/history" element={<UserPageHistoryComp/>}/>
        <Route path="/races" element={<TestRaces />} />
      </Routes>
    </Router>

  );
}


export default App
