
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexComp from './main_components/Index';
import RegisterComp from './components/userpg_comp/RegisterComp';
import UserPageHistoryComp from './components/userpg_comp/UserPageHistoryComp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexComp />} />   
        <Route path="/new/account" element={<RegisterComp />} />  
        <Route path ="/new/account/history" element={<UserPageHistoryComp/>}/>
      </Routes>
    </Router>

  );
}


export default App
