import logo from './logo.svg';
import './App.css';
// import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';



function Webpages(){
  return <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        {/* <Route path="teams" element={<Teams />} /> */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>;
}

function App() {
  return (
    <main>
      <Webpages />
    </main>
  );
}

export default App;
