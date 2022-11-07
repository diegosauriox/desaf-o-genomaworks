import React,{useState,useEffect} from "react";
import ReactDOM from "react-dom/client";

import {Tabla} from './components/Tabla'
const root = ReactDOM.createRoot(document.getElementById("root"));

//jsx html+js
const handleChange = (e) => {
  console.log(e.target.value);
};
/* 
const users = [
  {
    id: 1, 
    name: "diego", 
    image: "https://robohash.org/user" 
  },
  {
    id: 2, 
    name: "victoe", 
    image: "https://robohash.org/user1" 
  },
]; */
let counter=1
/* useEffect(function(){
  
}) */
function Contador(){
  const [mensaje, setMensaje]=useState("")

  return <div>
    <input onChange={e=>{
      setMensaje(e.target.value)
    }}></input>
    <button>save</button>
  </div>
}

root.render(
  <>
   {/*  {users.map((user,i) =>{
      return <div key={i}>
        <h1 >{user.name}</h1>
        <img src={user.image}/>
      </div>
    })} */}
    {/* <Button/> */}
    {/* <Contador/> */}
    <Tabla/>
  </>
);
