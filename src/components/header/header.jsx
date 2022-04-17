import React from 'react';
import s from'./header.module.css';
import { NavLink } from "react-router-dom";
const Header = (props) =>{
 return(
    <header className = {s.header}>  
    <div className = {s.login}>
      {props.isAuth ? <button onClick={props.logout}>Logout</button> :<NavLink className = {s.loginColor}to = "/login">Login</NavLink>};
    </div>
  </header>
 )
 
}
export default Header;