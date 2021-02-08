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
            <div style={{padding: '5px'}}>
            Username: &nbsp;
            <input
            type="text"
            value={ username }
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            style={{ width: '150px', textAlign: 'right',}}
            />
            </div>
            <div style={{padding: '5px'}}>
            Password: &nbsp;&nbsp;
            <input
            type="password"
            value={ password }
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            style={{ width: '150px', textAlign: 'right'}}
            />
            </div>
            <button style={{border: 'none', cursor: 'pointer', fontSize: '18px', color: 'white', backgroundColor:'#bac3d1', padding: '5px', margin: '10px'}}type="submit">login</button>
            <br/>
        </form>
    )
}

export default LoginForm