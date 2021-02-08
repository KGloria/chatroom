import React, { useState } from 'react'

const LoginForm = ({ Login }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event, next) => {
        event.preventDefault()
        Login({
            username: username,
            password: password,
        })
        setUsername('')
        setPassword('')
    }


    return (
        <form onSubmit={handleLogin}>
            <br/>
            <div>
            username: 
            <input
            type="text"
            value={ username }
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password: 
            <input
            type="password"
            value={ password }
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
            <br/>
        </form>
    )
}

export default LoginForm