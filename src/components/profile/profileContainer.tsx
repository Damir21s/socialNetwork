import React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { getUsersProfile, getStatus, getUpdateStatus, savePhoto, saveProfile } from "../../redux/reducerProfilePage"
import Profile from "./profile"
import { useMatch } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { profileType } from "../../types/types"
import { AppReducerType } from "../../redux/redux-store"
let ProfileContainer: React.FC<PropsType> = ({ getUsersProfile, match, getStatus, error,
    savePhoto, saveProfile, profile, status, getUpdateStatus }) => {
    useEffect(() => {
        getUsersProfile(match)
    }, [match])
    useEffect(() => {
        getStatus(match)
    }, [match])
    return (
        <Profile error={error} savePhoto={savePhoto}
            saveProfile={saveProfile} isOwner={!match} profile={profile}
            status={status} getUpdateStatus={getUpdateStatus} />
    )
}

const withRouter = (Component: any) => {
    let ProfileMatch = (props: any) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match} />;
    }
    return ProfileMatch;
}
type mapDispatchToPropsType = {
    savePhoto: (e: string) => void
    saveProfile: () => void
    getUpdateStatus: () => void
    getUsersProfile: (match: any) => void
    getStatus: (match: any) => void
}
type mapStateToPropsType = {
    profile: profileType | null 
    status: string
    error: any
    isAuth: boolean | null
}
type ownPropsType = {

}
type ProfileMatchType = {
    match: any
}
type PropsType = mapStateToPropsType & mapDispatchToPropsType & ownPropsType & ProfileMatchType
let mapStateToProps = (state: AppReducerType): mapStateToPropsType => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        error: state.profilePage.error
    }

}
export default compose(connect(mapStateToProps, { getUsersProfile, getStatus, getUpdateStatus, savePhoto, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer);