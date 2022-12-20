import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import './UserEditProfile.css'

const UserEditProfile = () => {
    const dispatch = useDispatch();
    const [profileIcon, setProfileIcon] = useState(null);
    const [profileIconURL, setProfileIconURL] = useState(null);
    const location = useLocation(); 

    const handleFile = e => {
        const file = e.currentTarget.files[0]
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                setProfileIcon(file);
                setProfileIconURL(fileReader.result);
            }
        }
    }

    const sessionUser = useSelector(state => state.session.user)

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('')
    }

    return ( sessionUser.id && 
        <div className="user-profile-edit">
            <div className='user-profile-el'>
                <p className='user-profile-text photo'>Your Photo</p>
                <div className='photo-upload'>
                    <label>
                        <input className='photo-upload-input' type="file"/>
                        <div className='settings-photo-upload'>
                            <i id='settings-profile-user-icon' className="fa-regular fa-user settings-user-icon"></i>
                            <div className='user-icon-bottom'>
                                <i id='camera-icon' className="fa-solid fa-camera"></i>
                            </div>
                        </div>
                    </label>
                    <input id='photo-upload-input' className='photo-upload-input' type="file" />
                    <label htmlFor='photo-upload-input' id='photo-upload-label'>Choose File</label>
                </div>
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text username'>Username</p>
                <p>{sessionUser.username}</p>
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text city'>City</p>
                <input className='settings-input' type="text" />
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text state-country'>State/Country</p>
                <input className='settings-input' type="text" />
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text bio'>Bio</p>
                <textarea id='settings-bio' className='settings-input' type="text" />
            </div>
        </div>
    )
}

export default UserEditProfile;