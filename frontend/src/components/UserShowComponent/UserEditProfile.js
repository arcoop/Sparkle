import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { fetchUser, updateUser, updateUserIcon } from '../../store/users';
import './UserEditProfile.css'

const UserEditProfile = ({user}) => {
    // const sessionUser = useSelector(state => state.session.user)
    // const user = useSelector(state => state.users[userId])
    const dispatch = useDispatch();
    const location = useLocation();
    const [profileIcon, setProfileIcon] = useState(user.id ? user.icon : null)
    const [profileIconURL, setProfileIconURL] = useState(user.id ? user.iconUrl : null);
    const [city, setCity] = useState(user.city ? user.city : "") 
    const [stateAndCountry, setStateAndCountry] = useState(user.stateCountry ? user.stateCountry : "")
    const [bio, setBio] = useState(user.bio ? user.bio : "")
    const [errors, setErrors] = useState([])
    const [succesMessage, setSuccessMessage] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [successSubmission, setSuccessSubmission] = useState(false)

    const deleteIcon = () => {
        user.iconUrl = null
        setProfileIcon(null)
        setProfileIconURL(null)
        setErrors([])
        const userData = new FormData()
        userData.append('user[email]', user.email)
        userData.append('user[username]', user.username)
        userData.append('user[id]', user.id)
        dispatch(updateUserIcon(userData))
            .catch(async res => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            })
            .then(async data => {
                setSuccessMessage(["user saved"])
                setSuccessSubmission(true)
            })
    }

    const handleFile = e => {
        const file = e.currentTarget.files[0]
        if (file) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                setProfileIcon(file);
                setProfileIconURL(fileReader.result)
            }

            // const formData = new FormData();
            // formData.append('user[email]', sessionUser.email)
            // formData.append('user[username]', sessionUser.username)
            // if (profileIcon) formData.append('user[icon]', profileIcon)
            // if (sessionUser.id) {
            //     formData.append('user[id]', sessionUser.id)
            //     dispatch(updateUser(formData))
            //         .catch(async res => {
            //             const data = await res.json();
            //             if (data && data.errors) setErrors(data.errors)
            //         })
            //         .then(async data => {
            //             setSuccessMessage(["user saved"])
            //         })
            // }
        }
    }


    const handleSubmit = e => {
        e.preventDefault();
        setErrors([])
        const formData = new FormData();
        formData.append('user[email]', user.email)
        formData.append('user[username]', user.username)
        formData.append('user[city]', city)
        formData.append('user[state_country]', stateAndCountry)
        formData.append('user[bio]', bio)
        if (profileIcon) formData.append('user[icon]', profileIcon)
        if (user.id) {
            formData.append('user[id]', user.id)
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

    const handleStateCountryChange = e => {
        setStateAndCountry(e.target.value)
    }

    const handleBioChange = e => {
        setBio(e.target.value)
    }

    const userProfilePic = 
    <div className='settings-photo-upload'>
        <img className='settings-user-pic' src={`${user.iconUrl}`} alt="" />
        <div className='user-icon-bottom user-pic'>
            <i id='camera-icon' className="fa-solid fa-camera"></i>
        </div>
    </div>

    const userIcon = <div className='settings-photo-upload'>
        <i id='settings-profile-user-icon' className="fa-regular fa-user settings-user-icon"></i>
        <div className='user-icon-bottom'>
            <i id='camera-icon' className="fa-solid fa-camera"></i>
        </div>
    </div>

    return ( user && 
        <>
            <div className="user-profile-edit">
                <div className='user-profile-el'>
                    <p className='user-profile-text photo'>Your Photo</p>
                    <div className='photo-upload'>
                        <label>
                            <input onChange={handleFile} className='photo-upload-input' type="file"/>
                            {user.iconUrl ? userProfilePic : userIcon}
                        </label>
                        <input onChange={handleFile} id='photo-upload-input' className='photo-upload-input' type="file" />
                        <div className='settings-photo-buttons'>
                            <label htmlFor='photo-upload-input' id='photo-upload-label'>Choose File</label>
                            <div onClick={deleteIcon} className='settings-delete-icon'>Delete</div>
                        </div>
                    </div>
                </div>
                <div className='user-profile-el'>
                    <p className='user-profile-text username'>Username</p>
                    <p>{user.username}</p>
                </div>
                <div className='user-profile-el'>
                    <p className='user-profile-text city'>City</p>
                    <input onChange={handleCityChange} value={city} className='settings-input' type="text" />
                </div>
                <div className='user-profile-el'>
                    <p className='user-profile-text state-country'>State/Country</p>
                    <input onChange={handleStateCountryChange} value={stateAndCountry} className='settings-input' type="text" />
                </div>
                <div className='user-profile-el'>
                    <p className='user-profile-text bio'>Bio</p>
                    <textarea onChange={handleBioChange} value={bio} id='settings-bio' className='settings-input' type="text" />
                </div>
            </div>
            <div className='edit-profile-save-button' onClick={handleSubmit}>Save Changes</div>
        </>
    )
}

export default UserEditProfile;