import './App.css';
import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetSearch from './pages/PetSearch';
import Layout from './components/Layout';


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

  return (
    <APIContext.Provider value={useAPIContext()}>
      <main>
        <Webpages />
      </main>
    </APIContext.Provider>
  );
}

export default App;
