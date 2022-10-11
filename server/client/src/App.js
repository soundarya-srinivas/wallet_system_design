
import './App.css';
import Transaction from './components/Transaction';
import UserWallet from './components/UserWallet';
import WalletSetup from './components/WalletSetup';
import {BrowserRouter,Routes,useNavigate,Route,useLocation} from "react-router-dom"
import { useEffect } from 'react';
import ShowTransactions from './components/ShowTransactions';
function App() {
  
  const accExists= localStorage.hasOwnProperty("walletId");
  const walletId=accExists?localStorage.getItem("walletId"):"";
  const navigate=useNavigate();
  const location=useLocation();

  useEffect(() => {
    if(!location.pathname.includes("/ShowTransaction")){
  if(accExists){
navigate("/")
  }else{
navigate("/setup")
  }
}
  }, [])
  

  return (
    <div className="App" style={{backgroundImage:`url("world-map-background.jpg")`}}>
    
      <Routes>
        <Route path='/' element={<UserWallet/>} />
        <Route path="/setup" element={<WalletSetup/>}/>
        <Route path="/ShowTransaction" element={<ShowTransactions/>}/>

      </Routes>
   
    
    
   
    </div>
  );
}

export default App;
