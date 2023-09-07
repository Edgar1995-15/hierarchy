import { useState } from 'react';
import './App.css';
import AddSection from './components/addSection';
import Section from './components/section';

function App() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <div className="App">
      <AddSection setIsVisible={setIsVisible} />
      <Section isVisible={isVisible} />
    </div>
  );
}

export default App;
