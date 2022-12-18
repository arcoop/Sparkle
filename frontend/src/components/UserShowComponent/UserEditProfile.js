import { useState } from 'react';
import { useDispatch } from 'react-redux';
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

    const handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('')
    }

    return ( 
        <div className="user-profile-edit">
            <div className='user-profile-el'>
                <p className='user-profile-text photo'>Your Photo</p>
                <div className='photo-upload'>
                    
                </div>
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text username'>Username</p>
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text city'>City</p>
                <input type="text" />
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text state-country'>State/Country</p>
                <input type="text" />
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text bio'>Bio</p>
                <textarea type="text" />
            </div>
        </div>
    )
}

export default UserEditProfile;