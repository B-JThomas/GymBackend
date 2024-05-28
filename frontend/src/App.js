import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

//=====COMPONENTS=====
import Header from './components/Header'
import Footer from './components/Footer'

//=====PAGES=====
import Home from './pages/Home';
import Login from './pages/Login';
import NoPage from './pages/NoPage';


function App() {

  const [authenticated, setAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5001/auth/verify/", {
        method: "GET",
        headers: { token: localStorage.token }
      });
  
      const parseData = await res.json();
      setAuthenticated(parseData === true);
      console.log("Condition: " + parseData);

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);


  return (
    <div>
      {authenticated ? (<Header />) : <></>}
      <BrowserRouter >
        <Routes>
          {!authenticated ? (
            <>
              <Route index element={<Login />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route index element={<Home />} />
              <Route path="/home" element={<Home />} />
            </>
          )}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
