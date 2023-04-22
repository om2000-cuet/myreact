import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom';
import { useEffect, useState } from 'react';

function App() {
  const [{buttonText1, buttonText2}, setButtonText] = useState({buttonText1: 'Home', buttonText2: 'Contact'});
  const [title, setTitle] = useState("OPC Home title");

  useEffect(() => {
    document.title = title;
  }, [title]);

  const navigate = useNavigate();
  const navigateToContacts = () => {
    navigate('/contacts');
    setButtonText(prevState => ({...prevState, buttonText1: 'Home2'}));
    setTitle("Contact Page Om Title");
  }

  const navigateHome = () => {
    navigate('/');
    setButtonText(prevState => ({...prevState, buttonText2: 'Contact2'}));
    setTitle("Page Home Title");
  }

  return (
    <div>
      <button onClick={navigateHome}>{buttonText1}</button>
      <button onClick={navigateToContacts}>{buttonText2}</button>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/" element={<Home name="om" />} />
      </Routes>
    </div>
  );
}

function Home(props) {
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users/")
      .then(res => res.json())
      .then(
        (data) => {
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  return (
    <div>
      <h2>Hello World</h2>
      <h3>{props.name}</h3>
      {error ? (<div>No data</div>) : (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Contacts() {
  return (
    <h2>I am in Contact</h2>
  );
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
