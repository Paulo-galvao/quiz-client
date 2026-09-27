import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css';
import App from './App.tsx';
import Quiz from './components/Quiz.tsx';
import Score from './components/Score.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
 
      <Routes>

        <Route path="/" element={<App />}/>
        <Route path="/quiz/:quiz_id" element={<Quiz/>} />
        <Route path="/score" element={<Score/>} />
      
      </Routes>
      
    </BrowserRouter>
  </StrictMode>,
)
