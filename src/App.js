import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './components/Home';
import WatchList from './components/WatchList';
import PublicWatchList from './components/PublicWatchList';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/watchlist' element={<WatchList />} />
          <Route path="watchlist/:email" element={<PublicWatchList />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
