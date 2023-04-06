import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Navigate} from "react-router-dom"; 
import Navbar from './Navbar/Navbar';
import LandingPage from './Landing Page/LandingPage';
import MyCollection from './My Collection/MyCollection';
import History from './History/History';
import WatchLater from './Watch Later/WatchLater';
import NewMovies from './New Movies/NewMovies';
import { UserAuth } from './Auth/AuthContext';

function App() {
  
   
    
  return (
    <div className="App">
        <Navbar/>
        <div className='middle'>
        <MyCollection/>
        <LandingPage/>
        <History/>
        <NewMovies/>
        <WatchLater/>
        </div>    
    </div>
  );
}

export default App;
