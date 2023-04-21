import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import  { createRoot } from 'react-dom';

function App() {
  const navigate=useNavigate();
  const navigateToContacts=()=>{
    navigate('/contacts');
  }
const navigateHome=()=>{
  navigate('/');
}


  return (
    <div>
      <button onClick={navigateHome}>Home</button>
      <button onClick={navigateToContacts}>Contacts</button>
      <Routes>
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/" element={<Home/>} />
      </Routes>




      </div>
  );
}
function Home(){
  return(<div>
  <h2>Hello World</h2>
</div>

  );
}
function Contacts(){
  return(
    <h2>i am in Contact</h2>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);