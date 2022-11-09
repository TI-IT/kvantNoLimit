
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function App() {
    const server_host = process.env.NODE_ENV === 'development ' ? 'http://localhost:9001' : 'https://api.kvantnolimit.ru';
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home server_host={server_host} />} />
              <Route path="/login" element={<Login server_host={server_host} />} />
              <Route path="/signup" element={<SignUp server_host={server_host} />} />
              <Route path="/users" element={<Users server_host={server_host} />} />
              <Route path="/dashboard" element={<Dashboard server_host={server_host} />} />
              <Route path="/admin" element={<Admin server_host={server_host} />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
