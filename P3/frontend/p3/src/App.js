import './App.css';
import { APIContext, useAPIContext } from './contexts/APIContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PetSearch from './pages/PetSearch';
import Layout from './components/Layout';
import PetSeekerDashboard from './pages/PetSeekerDashboard';
import PetSeekerHelp from './pages/PetSeekerHelp';
import PetSeekerAdoption from './pages/PetSeekerAdoption';
import PetSeekerSecurity from './pages/PetSeekerSecurity';
import PetAdd from './pages/PetAdd/pet-add';
import PetUpdate from './pages/PetUpdate/pet-update';
import { useState } from 'react';
import PetDetails from './pages/PetDetails';
import Notification from './pages/Notification';
import CommentPage from './pages/Comments/comments';

import PublicShelterDetails from './pages/PublicShelterDetails';

function Webpages(){
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<NotFound />} />
        <Route path='notification' element={<Notification/>}/>
        <Route path="pet-seeker-dashboard" element={<PetSeekerDashboard />} />
        <Route path="pet-seeker-help" element={<PetSeekerHelp />} />
        <Route path="pet-seeker-adoption" element={<PetSeekerAdoption />} />
        <Route path="pet-seeker-security" element={<PetSeekerSecurity />} />
        <Route path="petSearch" element={<PetSearch/>}/>
        <Route path="pet-add" element={<PetAdd/>}/>
        <Route path="petDetails/:id" element={<PetDetails/>}/>
        <Route path="pet-update/:id" element={<PetUpdate/>}/>
        <Route path="shelterDetails/:id" element={<PublicShelterDetails/>}/>
        <Route path="comments/:objectId/:forShelter" element={<CommentPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
    'avatar_src' : "",
    'location' : ""
   })
    
    return (
      <APIContext.Provider value={{user, setUser}}>
        <main>
          <Webpages />
        </main>
      </APIContext.Provider>
    );
  }

  export default App;