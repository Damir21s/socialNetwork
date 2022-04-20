import React from "react"
import Users from "./users";
import Preloader from "../common/preloader/preloader";
import { useSelector } from "react-redux";
import { AppReducerType } from "../../redux/redux-store";
export const UsersPage = () => {
    const isFetching = useSelector((state: AppReducerType) => state.usersPage.isFetching)
    debugger;
    return <>
        {isFetching ? <Preloader /> : null}
        <Users  />
    </>
}
