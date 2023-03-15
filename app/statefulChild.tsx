'use client'
import { useState } from 'react'
import Message from './messageComponent'

export default function InnerHome() {

  let [messages, setMessages] = useState({})
  let [inputText, setInputText] = useState('')

  return (
    <div className='app'>
      <Message name='foo bar' message='sphinx of black quartz judge my vow' />
      <Message name='Smug Douglass' message={inputText} />
      <textarea className='textbox' onChange={(e) => {setInputText(e.target.value)}} value={inputText} />
    </div>
  )
}
