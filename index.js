import React from "react";
import ReactDom from "react-dom";
import { createRoot } from "react-dom";
import { useState } from "react";
function App() {
  const [color, setColor] = useState("Red");
  const [cars, setCars] = useState([
    { id: 1, brand: "Audi" },
    { id: 2, brand: "ford" },
    { id: 3, brand: "BMW" },
  ]);

  function changeColor(a) {
    setColor(a);
    const newCar={id:4,brand:"Tata"};
    setCars([...cars,newCar]);
  }

  return (
    <>
      <h2>My Name is Om, I like {color} color</h2>
      <button onClick={() => changeColor("Orange 1")}> Orange </button>

 {cars.map((car)=>
  <li>{car.brand}</li>
)}
 

    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
