import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Lobbies from './Containers/Lobbies/Lobbies';
import Home from './Containers/Home/Home';
import Profile from './Containers/Profile/Profile';
import Search from './Containers/Search/Search';

import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Sidebar
      sidebarData={[
        {zIndex: "4",
        name: "Home",
        path: "/"
        },
        {zIndex: "3",
        name: "Lobbies",
        path: "/Lobbies"
        },
        {zIndex: "2",
        name: "Profile",
        path: "/profile/:id"
        },
        {zIndex: "1",
        name: "Search",
        path: "/search"
        }]}/>

        <Routes>
          <Route path="*" element={<Home/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/Lobbies" element={<Lobbies/>}/>
          <Route path="/profile/:id" element={<Profile/>}/>
          <Route path="/search" element={<Search/>}/>
          
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
