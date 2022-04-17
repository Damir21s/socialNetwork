import React  from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./header";
import { getAuth, logout } from "./../../redux/reducerAuth";
let HeaderContainer = (props) => {
    useEffect(()=>{
        props.getAuth()
    },[])
        return  <Header {...props}/>
}

let mapStateToProps = (state) =>{
    return{
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect(mapStateToProps, {getAuth, logout})(HeaderContainer);