import React from 'react'
import { profileType } from '../../types/types'
import HeaderProfile from './headerprofile/headerprofile'
import MyPostContainer from './myposts/mypostContainer'
type PropsType = {
  profile: profileType | null,
  status: string,
  savePhoto: () => void,
  isOwner: boolean,
  error: string | null,
  saveProfile: ()=> void,
  getUpdateStatus: ()=>void, 
}
const Profile: React.FC<PropsType> = ({error, savePhoto, saveProfile, isOwner, profile, status, getUpdateStatus}) => {
  return (
    <div>
      <HeaderProfile error = {error} savePhoto ={savePhoto} saveProfile ={saveProfile} 
       isOwner={isOwner} profile = {profile} status={status} getUpdateStatus={getUpdateStatus} />
      <MyPostContainer />
    </div>
  )
}
export default Profile;