'use client'
import { useState, useEffect } from 'react'
import Message from './messageComponent'
import messageJson from './messages.json'

export default function InnerHome() {

  let [messages, setMessages] = useState([])
  let [inputText, setInputText] = useState('')

  useEffect(() => { setMessages(messageJson) })

  let id = 0
  const mappedMessages = messages.map((item) => {
    id += 1
    return(
      <Message
      key={id} 
      id={id}
      name={item.name}
      message={item.message} />
    )
  })

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      messages.push({ 'name': 'ip', 'message': inputText })
      setMessages(messages)
      setInputText('')
    }
  }

  return (
    <div className='app'>
      {mappedMessages}
      <input className='textbox' onChange={(event) => {setInputText(event.target.value)}} value={inputText} onKeyDown={handleKeyDown} />
    </div>
  )
}
