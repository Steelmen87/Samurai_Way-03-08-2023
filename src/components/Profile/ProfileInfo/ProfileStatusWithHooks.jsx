import React, {useState,useEffect} from 'react';

const ProfileStatusWithHooks = (props) => {
    const [editMode,setEditMode] = useState(false)
    const [status,setStatus] = useState(props.status)
    const activateEditMode = () =>{
        setEditMode(true)
    }
    const deactivateEditMode = () =>{
        setEditMode(false)
        props.updateStatus(status)
    }
    const onStatusChange = (e) =>{
        setStatus(e.currentTarget.value)
    }
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])
    //85
    //86 virtual Dom
    return (
        <div>
            {!editMode&&
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || "-------"}</span>
                </div>
            }
            {editMode &&
            <div>
                <input
                    onChange={onStatusChange}
                    autoFocus={true}
                    onBlur={deactivateEditMode}
                    value={status}/>
            </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;

