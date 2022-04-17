import React from "react";
import { Navigate } from "react-router-dom";

type PropType = {
    isAuth: boolean
} 
export function withAuthRedirect<WCP> (Component: React.ComponentType<WCP>) {
    function RedirectComponent(props:WCP & PropType){
        if (!props.isAuth) return <Navigate to='/login' />;
        return <Component {...props}/>
    }
    return RedirectComponent
}