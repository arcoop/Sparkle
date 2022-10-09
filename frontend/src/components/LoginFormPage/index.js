import { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../store/session"
import './LoginForm.css'

const LoginFormPage = () => {
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()


    const handleSubmit = e => {
        e.preventDefault()
        const user = {credential, password}
        setErrors([])
        return dispatch(login(user))
            .catch(async(res) => {
                setErrors(res.errors)
            })
    }

    return (
        <>
            <ul>
                {errors.map(error => {
                    return (
                        <li key={error}>{error}</li>
                    )
                })}
            </ul>
            <form onSubmit={handleSubmit}>
                <label> Username or Email
                    <input 
                        type="text" 
                        onChange={e => setCredential(e.target.value)}
                        />
                </label>

                <label> Password
                    <input type="password" 
                    onChange={e => setPassword(e.target.value)}
                    />
                </label>
                
                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default LoginFormPage;