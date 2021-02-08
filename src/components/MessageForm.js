import React, { useState } from 'react'

const MessageForm = ({ user, createMessage }) => {
    const [ newMessage, setNewMessage ] = useState('')

    const handleNewMessage = (event) => {
        event.preventDefault()
        console.log('sending message')
    
        const timestamp = new Date()
    
        createMessage({
          title: newMessage,
          user: user,
          date: timestamp.toString()
        })
    }

    const handleMessageChange = (event) => {
        setNewMessage(event.target.value)
      }

    return (
        <form onSubmit={handleNewMessage}>
        Message:&nbsp;
        <input value={newMessage} onChange={handleMessageChange}/>&nbsp;
        <button type="submit">Send</button>
      </form>
    )
}

export default MessageForm