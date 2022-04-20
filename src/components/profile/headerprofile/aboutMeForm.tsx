import React from 'react';
import {FormikProps, useFormik} from "formik"
import { useState } from "react";
import { profileType } from '../../../types/types';
type PropsType = {
    profile: profileType
    saveProfile: (values: FormikValues)=> void
    error: string | null
}
type contactsType = {
    vk: string
    facebook: string
    instagram: string
}
type FormikValues = {
    FullName: string
    AboutMe: string
    LookingForAJob: boolean
    LookingForAJobDescription: string
    contacts: contactsType | any
}
let AboutMeForm: React.FC<PropsType>= ({profile, saveProfile, error}) => {
    let [edit, setEdit] = useState(false)
    const formik: FormikProps<FormikValues> = useFormik<FormikValues>({
        initialValues: {
            FullName: profile.fullName,
            AboutMe: profile.aboutMe,
            LookingForAJob: profile.lookingForAJob,
            LookingForAJobDescription: profile.lookingForAJobDescription,
            contacts: [
                {vk: profile.contacts.vk},
                {facebook: profile.contacts.facebook},
                {instagram: profile.contacts.instagram}
            ]
        },
        onSubmit: (values) => {
            saveProfile(values)
            setEdits()
        },
    });
    let setEdits = () => {
        if (error != null) {
            setEdit(true)
        }
        else{
            setEdit(false)
        }
    }
    return (
        <div>
            {!edit && <button onClick={() => { setEdit(!edit) }}>Edit About Me</button>}
            {error != null ? <div>{error}</div> : <></>}
            {edit &&
                <form onSubmit={formik.handleSubmit}>
                    <div><button type="submit">Save</button></div>
                    <div>Full name:</div>
                    <input
                        id="FullName"
                        name="FullName"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.FullName}
                    />
                    <div>About me:</div>
                    <input
                        id="AboutMe"
                        name="AboutMe"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.AboutMe}
                    />
                    <div>Looking for a job:</div>
                    <input
                        id="lookingForAJob"
                        name="LookingForAJob"
                        type="checkbox"
                        onChange={formik.handleChange}
                        checked={formik.values.LookingForAJob}
                    />
                    <div>Looking for a job description:</div>
                    <input
                        id="LookingForAJobDescription"
                        name="LookingForAJobDescription"
                        onChange={formik.handleChange}
                        value={formik.values.LookingForAJobDescription}
                    />
                    <div><b>Contacts:</b></div>
                    <div>Facebook:</div>
                    <input
                        id="facebook"
                        name="contacts.facebook"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.contacts.facebook}
                    />
                    <div>Vk:</div>
                    <input
                        id="vk"
                        name="contacts.vk"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.contacts.vk}
                    />
                    <div>Instagram:</div>
                    <input
                        id="instagram"
                        type="text"
                        name="contacts.instagram"
                        onChange={formik.handleChange}
                        value={formik.values.contacts.instagram}
                    />
                </form>}
            {!edit && <div>
                <div>Name: {profile.fullName}</div>
                <div>About me: {profile.aboutMe}</div>
                <div>ContactsVk: {profile.contacts.vk}</div>
                <div>lookingForAJob: {(profile.lookingForAJob ? 'yes' : 'no')}</div>
                <div>lookingForAJobDescription: {profile.lookingForAJobDescription}</div>
                <b>Contacts:</b>
                <div>facebook: {profile.contacts.facebook}</div>
                <div>vk: {profile.contacts.vk}</div>
                <div>instagram: {profile.contacts.instagram}</div>
            </div>}
        </div>
    )
}
export default AboutMeForm;