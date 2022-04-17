import React from 'react';
import Preloader from '../../common/preloader/preloader';
import s from './headerprofile.module.css';
import noAvatarPicture from "./../../../assets/no-avatar.png";
import LocalStateStatusProfile from './stateHeaderProfile';
import AboutMeForm from './aboutMeForm';
import { profileType } from '../../../types/types';
type PropsType ={
  profile: profileType | null,
  status: string,
  savePhoto: (e: string) => void,
  isOwner: boolean,
  error: any,
  saveProfile: ()=> void,
  getUpdateStatus: ()=>void,
}
const HeaderProfile: React.FC<PropsType> = ({profile, status, savePhoto, isOwner, error, saveProfile, getUpdateStatus}) => {
  if (!profile) {
    return <Preloader />
  }
  let onMainPhotoSelected = (e: any) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }
  return (
    <div className={s.headerProfile}>
      <div>
        <img className={`${s.content} ${s.img}`} src='https://phonoteka.org/uploads/posts/2021-05/1620993238_18-phonoteka_org-p-tsvetnoi-fon-dlya-prevyu-18.jpg'></img>
      </div>
      <div className={s.description}>
        <div><img className={s.avatar} src={profile.photos.large == null ? noAvatarPicture : profile.photos.small} /></div>
        {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        <div><LocalStateStatusProfile status={status} updateStatus={getUpdateStatus} /></div>
        <AboutMeForm error = {error} profile = {profile} saveProfile = {saveProfile}/>
      </div>
    </div>
  )
}
export default HeaderProfile;