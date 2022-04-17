import React from 'react';
import {useFormik} from "formik"
import { useState } from "react";

let AboutMeForm = (props) => {
    let [edit, setEdit] = useState(false)
    const formik = useFormik({
        initialValues: {
            FullName: props.profile.fullName,
            AboutMe: props.profile.aboutMe,
            LookingForAJob: props.profile.lookingForAJob,
            LookingForAJobDescription: props.profile.lookingForAJobDescription,
            contacts: [
                {vk: props.profile.contacts.vk},
                {facebook: props.profile.contacts.facebook},
                {instagram: props.profile.contacts.instagram}
            ]
        },
        onSubmit: (values) => {
            props.saveProfile(values)
            setEdits()
        },
    });
    let setEdits = () => {
        if (props.error != null) {
            setEdit(true)
        }
        else{
            setEdit(false)
        }
    }
    return (
        <div>
            {!edit && <button onClick={() => { setEdit(!edit) }}>Edit About Me</button>}
            {props.error != null ? <div>{props.error}</div> : <></>}
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
                <div>Name: {props.profile.fullName}</div>
                <div>About me: {props.profile.aboutMe}</div>
                <div>ContactsVk: {props.profile.contacts.vk}</div>
                <div>lookingForAJob: {(props.profile.lookingForAJob ? 'yes' : 'no')}</div>
                <div>lookingForAJobDescription: {props.profile.lookingForAJobDescription}</div>
                <b>Contacts:</b>
                <div>facebook: {props.profile.contacts.facebook}</div>
                <div>vk: {props.profile.contacts.vk}</div>
                <div>instagram: {props.profile.contacts.instagram}</div>
            </div>}
        </div>
    )
}
export default AboutMeForm;