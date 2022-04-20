import React from 'react';
import s from'./header.module.css';
import { NavLink } from "react-router-dom";
type PropsType = {
  isAuth: boolean | null
  logout: () => void
}
const Header: React.FC<PropsType> = ({isAuth, logout}) =>{
 return(
    <header className = {s.header}>  
    <div className = {s.login}>
      {isAuth ? <button onClick={logout}>Logout</button> :<NavLink className = {s.loginColor}to = "/login">Login</NavLink>};
    </div>
  </header>
 )
 
}
export default Header;