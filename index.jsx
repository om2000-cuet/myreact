import React from "react";
import ReactDom from "react-dom/client";
import About from "./aboutMe";
import { useState, useEffect } from "react";
import axios from "axios"; 
function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  const handleCheck = () => {
   fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'opc',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
  }
 
useEffect( 
   ()=>{
      const body={
         id:1,
         userId : 1 ,
         title: "test by opc",
         completed: "completed"
      };
    axios
    .put("https://jsonplaceholder.typicode.com/posts/1",body)
   .then((response) => response.json())
         .then((json) => console.log(json));

   },[count]
);

  function counter() {
   setCount(count+1);
  }

  return (
    <>
    {count}

      <button onClick={counter}>clikc here</button> 
<button onClick={handleCheck}>HandleCheck</button>
   


    </>
  );
}

ReactDom.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
