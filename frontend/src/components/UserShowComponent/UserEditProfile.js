import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { updateUser } from '../../store/users';
import './UserEditProfile.css'

const UserEditProfile = () => {
    const dispatch = useDispatch();
    const [profileIcon, setProfileIcon] = useState(null);
    const [profileIconURL, setProfileIconURL] = useState(null);
    const location = useLocation();
    const [city, setCity] = useState("") 
    const [errors, setErrors] = useState([])
    const [succesMessage, setSuccessMessage] = useState([])
    const [redirect, setRedirect] = useState(false)

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
        setErrors([])
        const formData = new FormData();
        formData.append('user[email]', sessionUser.email)
        formData.append('user[username]', sessionUser.username)
        if (profileIcon) formData.append('user[icon]', profileIcon)
        if (sessionUser.id) {
            formData.append('user[id]', sessionUser.id)
            dispatch(updateUser(formData))
                .catch(async res => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors)
                })
                .then(async data => {
                    setSuccessMessage(["user saved"])
                })
        }
    }

    const handleCityChange = e => {
        setCity(e.target.value)
    }

    return ( sessionUser.id && 
        <div className="user-profile-edit">
            <div className='user-profile-el'>
                <p className='user-profile-text photo'>Your Photo</p>
                <div className='photo-upload'>
                    <label>
                        <input onChange={handleFile} className='photo-upload-input' type="file"/>
                        <div className='settings-photo-upload'>
                            <i id='settings-profile-user-icon' className="fa-regular fa-user settings-user-icon"></i>
                            <div className='user-icon-bottom'>
                                <i id='camera-icon' className="fa-solid fa-camera"></i>
                            </div>
                        </div>
                    </label>
                    <input onChange={handleFile} id='photo-upload-input' className='photo-upload-input' type="file" />
                    <label htmlFor='photo-upload-input' id='photo-upload-label'>Choose File</label>
                </div>
            </div>
            <div className='user-profile-el'>
                <p className='user-profile-text username'>Username</p>
                <p>{sessionUser.username}</p>
            </div>
            <div className='user-profile-el'>
                <p onChange={handleCityChange} className='user-profile-text city'>City</p>
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
            <div onClick={handleSubmit}>Save</div>
        </div>
    )
}

export default UserEditProfile;