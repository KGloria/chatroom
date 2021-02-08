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

  const MsgBox = () => (
    <div style={{ height: '70vh', overflowY: 'scroll', overflowX: 'wrap',}}>
    {messages.map(message => 
      <div key={message.title.concat(message.date).concat(message.user.username)}>
        <p style={{marginBottom: '0', display: 'flex', flexWrap: 'wrap'}}>
          <b
          style={{color:'#DB5867'}}>{message.user.username}
          </b>&nbsp;:&nbsp;
          <font style={{color:'grey', fontSize:'11px', textAlign:'center', lineHeight: '20px'}}> {message.date}</font>   
          <font style={{ background:'#e5e4e3', padding:'5px', borderRadius: '15px', width: '98%', textAlign:'right'}}>{message.title}</font>
        </p>    
      </div>
    )}
    </div>
  )

  const MsgForm = () => (
    <MessageForm user={user} createMessage={handleNewMessage}></MessageForm>
  )

  return (
    <div style={{ backgroundColor: '#f2f7f4', height:'100vh'}}>
      {user
      ?
      <div style={{position: 'absolute', right:'5px', padding: '5px'}}>
        Logged in as: {user.username}&nbsp;
        <button style={{border: 'none', cursor: 'pointer', fontSize: '15px', color: 'white', backgroundColor:'#bac3d1'}}onClick={handleLogout}>logout</button>
      </div>
      : 
      <div style={{position: 'absolute', right:'5px', padding: '5px'}}>
      Welcome!
      </div>
      }
      <div style={{ margin:'auto', top: '100px' , width:'50%', border: '3px solid white', borderRadius: '5px'}}>

        <h2 style={{ color:'white', textAlign: 'center', background:'#58dbcc', padding:'25px', borderRadius: '2px'}}>KG Chatroom App</h2>
        {user 
        ? 
        <div style={{padding: '15px'}}>
          <MsgBox/>
          <div style={{paddingTop: '10px'}}>
          <MsgForm/>
          </div>
        </div>
        : 
        <div style={{ margin:'auto', width:'50%', padding: '10px', textAlign:'center'}}>
          <LoginForm Login={handleLogin}/>
        </div>
        }
      </div>

    </div>
  )  
}

export default App;
