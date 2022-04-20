import React  from 'react';
import { useEffect } from "react";
import { connect } from "react-redux";
import Header from "./header";
import { getAuth, logout } from "../../redux/reducerAuth";
import { AppReducerType } from '../../redux/redux-store';
type PropsType = {
    getAuth: ()=> void
    isAuth: boolean | null
    logout: () => void 
}
let HeaderContainer: React.FC<PropsType> = ({getAuth, isAuth, logout})=>{
    useEffect(()=>{
       getAuth()
    },[])
        return  <Header isAuth = {isAuth} logout = {logout}/>
}
type mapDispatchToPropsType = {
    getAuth: () => void
    logout: () => void
}
type mapStateToPropsType = {
    isAuth: boolean | null
    login: string | null
}
let mapStateToProps = (state: AppReducerType): mapStateToPropsType =>{
    return{
        isAuth: state.auth.isAuth,
        login: state.auth.login
    }
}
export default connect<mapStateToPropsType, mapDispatchToPropsType, {}, AppReducerType>(mapStateToProps, {getAuth, logout})(HeaderContainer);