import React from "react";
import ReactDOM from "react-dom/client";
import { Greetings, UserCard } from "./Greetings";
import Product, { Navbar } from "./Products";
import { Button } from "./Button";
import { TaskCard } from "./Task";
import { Saludar } from "./Saludar";
import {Posts} from './Posts'
const root = ReactDOM.createRoot(document.getElementById("root"));

//jsx html+js
const handleChange = (e) => {
  console.log(e.target.value);
};

root.render(
  <>
    <Posts/>
  </>
);
