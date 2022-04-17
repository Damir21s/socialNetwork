import React from "react"
import { useEffect} from "react"
import { login, getAuth} from '../../redux/reducerAuth'
import { connect } from "react-redux"
import { Navigate } from "react-router-dom"
import LoginForm from "./loginForm"
import { AppReducerType } from "../../redux/redux-store"
type mapDispatchToPropsType = {
    login: (email: string, password: string, captcha: string | null, rememberMe: boolean | null, setStatus: any)=> void,
    getAuth: ()=> void
}
type mapStateToPropsType = {
    isAuth: boolean | null,
    captcha: string | null
}
type ownPropsType = {

}
type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType
const Login: React.FC<PropsType> = ({getAuth, isAuth , login, captcha}) => {
    useEffect(()=>{
        getAuth(); 
    }, [isAuth])
    if(isAuth){
        return <Navigate to={"/profile"}/>
    }
    return (
        <div>
            <div>login</div>
            <LoginForm login = {login} captcha = {captcha} />
        </div>
    )
}
const mapStateToProps = (state: AppReducerType): mapStateToPropsType =>{
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captchaUrl       
    }
}
export default connect<mapStateToPropsType, mapDispatchToPropsType, ownPropsType, AppReducerType>(mapStateToProps,{login , getAuth})(Login)