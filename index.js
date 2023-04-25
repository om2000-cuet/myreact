import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useNavigate,useParams  } from 'react-router-dom';
import { createRoot } from 'react-dom';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import About from './about';
import aboutPage from './aboutPage.ejs';




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
  const navigateAbout=()=>{
    navigate('/about');
    
  }

  function About(){
    return(
        <aboutPage/>
    );
    
    }



  return (
    <div>
      <button onClick={navigateHome}>{buttonText1}</button>
      <button onClick={navigateToContacts}>{buttonText2}</button>
      <button onClick={navigateAbout}>About</button>
      <Routes>
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/about" element={<About/>} />
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
  const [img, setImg] = useState("https://allaboutbasic.files.wordpress.com/2023/03/header.jpg");
  function ImgChange(props) {
    return (
       
      <img src={props.change} />
     
    ) 
  }

  function imageChange(img) {
    return ( 
    <> 
    console.log(img) 
   <ImgChange change={img} /> 
  </>
    )
  }
function test(a){
  return(
   
   setImg(a)
 
 
 
  );
}
const opc=()=>{
  console.log("GG");
}
  return (
    <div>
      <h2>{name}</h2>
      <h2>Hello World</h2>

      <button onClick={() => imageChange('https://allaboutbasic.files.wordpress.com/2023/03/header.jpg')}>Img 1</button>
      <button onClick={ opc }>Img 2</button>
      <button onClick={()=>test('https://allaboutbasic.files.wordpress.com/2023/03/silueta.png')}>Img 2</button>
<img src={img}/>
<ImgChange change={img}/>
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
