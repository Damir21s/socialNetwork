import React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { getUsersProfile, getStatus, getUpdateStatus, savePhoto, saveProfile } from "../../redux/reducerProfilePage"
import Profile from "./profile"
import { PathMatch, useMatch } from "react-router-dom"
import { compose } from "redux"
import { withAuthRedirect } from "../hoc/withAuthRedirect"
import { profileType } from "../../types/types"
import { AppReducerType } from "../../redux/redux-store"
type PropsType = {
    profile: profileType | null 
    status: string
    error: string | null
    isAuth: boolean | null
    match: PathMatch<"userId"> | null
    savePhoto: () => void
    saveProfile: () => void
    getUpdateStatus: () => void
    getUsersProfile: (match: PathMatch<"userId"> | null) => void
    getStatus: (match: PathMatch<"userId"> | null) => void
}
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

function withRouter<WCP>(Component: React.ComponentType<WCP>){
    let ProfileMatch = (props: WCP) => {
        const match = useMatch('/profile/:userId/');
        return <Component {...props} match={match} />;
    }
    return ProfileMatch;
}
let mapStateToProps = (state: AppReducerType) => {
    return {
        profile: state.profilePage.profile,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        error: state.profilePage.error
    }

}
export default compose(connect(mapStateToProps, { getUsersProfile, getStatus, getUpdateStatus, savePhoto, saveProfile }), withRouter, withAuthRedirect)(ProfileContainer);