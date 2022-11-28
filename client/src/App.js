import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Users from './pages/Users';


function App() {
  const server_host = process.env.NODE_ENV === 'development' ? 'http://localhost:9001' : 'https://api.kvantnolimit.ru';
 
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login server_host={server_host}/>} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
