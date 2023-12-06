import './App.css';
import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetSearch from './pages/PetSearch';
import Layout from './components/Layout';
import { useState } from 'react';


function Webpages(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<NotFound />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="petSearch" element={<PetSearch/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/homepage" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>;
}

function App() {

  const [user, setUser] = useState({
    "userId":"", 
    "token" : "",
    "firstName": "",
    "lastName" : "",
    "isShelter": false,
    'avatar_src' : ""
});


  return (
    <APIContext.Provider value={{user, setUser}}>
      <main>
        <Webpages />
      </main>
    </APIContext.Provider>
  );
}

export default App;
