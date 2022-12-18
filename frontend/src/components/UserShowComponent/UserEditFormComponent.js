import { useState } from "react";
import UserEditProfile from "./UserEditProfile";
const UserEditForm = () => {

    const [settingsTab, setSettingsTab] = useState("Profile")
    
    return (
        <div>
            <h2>Settings: {settingsTab} </h2>
            <div className="left-settings-div">
                <h3 className="settings-div-header">Settings</h3>
                <ul>
                    <li>Profile</li>
                    <li>Password</li>
                    <li>Basic Info</li>
                </ul>
            </div>
            <div className="right-settings-tab">
                
            </div>
        </div>
    )

}
export default UserEditForm;