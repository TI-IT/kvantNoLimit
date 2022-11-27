import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signin from './pages/Signin';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signin />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
