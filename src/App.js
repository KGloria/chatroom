import React, { useState } from 'react'

const App = () => {
  const [ messages, setMessages ] = useState([
    {
      message: 'message',
      username: 'user1',
      time: new Date(),
      id: '1'
    },
    {
      message: 'message2',
      username: 'user2',
      time: new Date(),
      id: '2'
    },
    {
      message: 'message3',
      username: 'user3',
      time: new Date(),
      id: '3'
    },
  ])
  const [ newMessage, setNewMessage ] = useState(
    ''
  )

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const handleNewMessage = (event) => {
    event.preventDefault()
    console.log('sending message')

    const message = {
      message: newMessage,
      username: 'testuser',
      time: new Date(),
      id: messages.length + 1
    }

    setMessages(messages.concat(message))
  }

  return (
    <>
    <h2>messages</h2>
    {messages.map(message => 
      <div key={message.id}>
        <p>{message.message}</p>
        {message.username} {message.time.toString()}
      </div>
    )}
    <form onSubmit={handleNewMessage}>
      Message:&nbsp;
      <input value={newMessage} onChange={handleMessageChange}/>&nbsp;
      <button type="submit">Send</button>
    </form>


    </>
  )  
}

export default App;
