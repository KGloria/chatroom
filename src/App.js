import React, { useState, useEffect } from 'react'
import messageService from './services/messages'
import loginService from './services/login'
import MessageForm from './components/MessageForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const [ messages, setMessages ] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    messageService
    .getAll().then(messages =>
      setMessages( messages )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      messageService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (loginObject) => {

    const username = loginObject.username
    const password = loginObject.password

    try {
      const user  = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      console.log(user.token)
      messageService.setToken(user.token)
      setUser(user)
    } catch(exception) {
    }

  }

  const handleLogout = () => {
    console.log('Logging user out')
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }


  const handleNewMessage = (messageObject) => {

    messageService
      .create(messageObject)
      .then( returnedMessage => {
        setMessages(messages.concat(messageObject))
      })
      .catch(error => {
        
      })
  }

  const MsgForm = () => (
    <MessageForm user={user} createMessage={handleNewMessage}></MessageForm>
  )

  return (
    <>
    <h2>messages</h2>
    <LoginForm Login={handleLogin}/>
    {messages.map(message => 
      <div key={message.title.concat(message.date).concat(message.user.username)}>
        <p>{message.title}</p>
        {message.user.username} {message.date}
      </div>
    )}
    <MsgForm/>


    </>
  )  
}

export default App;
