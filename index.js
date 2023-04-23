import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate,useParams  } from 'react-router-dom';
import { createRoot } from 'react-dom';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';






function App() {
  const [{buttonText1, buttonText2}, setButtonText] = useState({buttonText1: 'Home', buttonText2: 'Contact'});
  const [title, setTitle] = useState("OPC Home title");

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
        <Route path="/" element={<Home users={users} error={error} name="om"/>} />
        <Route path="/address/:name" element={<Address users={users}  />} />
      </Routes>
    </div>
  );
}
function Address({ users }) {
  const { name } = useParams();
  console.log({name});
  const user = users.find(user => user.name === name);
  return (
    <div>
      <h2>Address for {name}</h2>
      <table>
        <tbody>
          <tr>
            <td>Street:</td>
            <td>{user.address.street}</td>
          </tr>
          <tr>
            <td>Suite:</td>
            <td>{user.address.suite}</td>
          </tr>
          <tr>
            <td>City:</td>
            <td>{user.address.city}</td>
          </tr>
          <tr>
            <td>Zipcode:</td>
            <td>{user.address.zipcode}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
function Home(props) {

  const { error, users, name } = props;

  return (
    <div>
        <h2>{name}</h2>
      <h2>Hello World</h2>
       


      
    
      
  


      {error ? (<div>No data</div>) : (
       
        <div className="container">
       
          {users.map(user => (

<div className="row">
<Link to={`/address/${user.name}`}>{user.name}</Link>
<div className="col-sm-4">{user.email}</div>
<div className="col-sm-4">{user.address.street}</div>
</div>
           
          ))}
           </div>
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
