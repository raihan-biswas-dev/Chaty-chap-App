
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Registrations from './pages/Registrations'
import Login from './pages/Login'
import Home from './pages/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registrations />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
