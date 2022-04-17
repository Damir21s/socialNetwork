import React from "react"
import { useEffect, useState } from "react"
type PropsType = {
    status: string,
    updateStatus: (editStatus: string) => void
}
const LocalStateStatusProfile: React.FC<PropsType> = ({status, updateStatus }) => {
    let [editMode, setEditMode] = useState(false)
    let [editStatus, setEditStatus] = useState(status)
    useEffect(() => {
        setEditStatus(status)
    }, [status])

    let deActivateEditMatch = () => {
        setEditMode(!editMode)
        updateStatus(editStatus)
    }
    return (

        <div>
            {!editMode && <span onClick={() => (setEditMode(!editMode))}>{status || "-----"}</span>}
            {editMode && <input onChange={(e) => (setEditStatus(e.currentTarget.value))} autoFocus={true} onBlur={deActivateEditMatch} value={editStatus}></input>}
        </div>


    )
}
export default LocalStateStatusProfile;