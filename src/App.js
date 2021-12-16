import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import InfoNav from './components/InfoNav';
import Login from './components/Login';
import './App.css';

function MainDisplay(props) {
  return (
    <>
      <InfoNav username={props.username} />
      <Feed username={props.username} />
    </>
  );
}

function App() {
  const [username, setUsername] = useState('vdoubleu');

  return (
    <div>
    <Routes >  
      <Route path="/" element={<Login setUsername={setUsername} />} />
      <Route path="/feed" element={<MainDisplay username={username} />} />
    </Routes>
    </div>
  );
}

export default App;
