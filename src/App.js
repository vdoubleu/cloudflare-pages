import { Routes, Route } from 'react-router-dom';
import Feed from './components/Feed';
import './App.css';

function App() {
  return (
    <Routes >  
      <Route path="/" element={<Feed />} />
    </Routes>
  );
}

export default App;
