'use client'
import _ from 'lodash'
import { useState, useEffect } from 'react'
import Message from './messageComponent'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function InnerHome() {

  let [messages, setMessages]: any[] = useState([])
  let [names, setNames]: any[] = useState([])
  let [inputText, setInputText] = useState('')
  let [myIp, setMyIp] = useState('')
  let [nameText, setNameText] = useState('')

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyB-lNG6danS5wodEmWpVEmTFbcesdx3qfE",
    authDomain: "microchat-30c83.firebaseapp.com",
    projectId: "microchat-30c83",
    storageBucket: "microchat-30c83.appspot.com",
    messagingSenderId: "198227390543",
    appId: "1:198227390543:web:f778007893bed6bf2b3a3a",
    measurementId: "G-G6QEH32V7G"
  })
  const db = getFirestore(firebaseApp)

  const getAllMessages = async () => {
    const messagesCollection = collection(db, 'messages')
    const query = await getDocs(messagesCollection)
    const messagesList = query.docs.map(doc => doc.data());
    setMessages(messagesList)
  }

  const getAllNames = async () => {
    const namesCollection = collection(db, 'names')
    const query = await getDocs(namesCollection)
    const namesList = query.docs.map(doc => doc.data());
    setNames(namesList)
  }

  const postOne = async () => {
    await addDoc(collection(db, 'messages'), {
      name: myIp,
      message: inputText,
      time: new Date()
    })
    setInputText('')
  }

  const postName = async () => {
      await setDoc(doc(db, 'names', myIp), {
        name: nameText,
        ip: myIp
      })
      getAllNames()
  }

  useEffect(() => { 
    if (_.isEqual(messages, [])) {
      getAllMessages()
      getAllNames()
      getMyIp()
    }
  })

  const getMyIp = () => {
    fetch('https://api64.ipify.org?format=json', {
  })
    .then(req => req.json())
    .then(res => {
      setMyIp(res.ip)
      setNameText(res.ip)
    })
  }

  const nameReplace = (ip: string) => {
    // names.find(name => console.log(typeof name))
    const goodName = names.find((name: any) => name.ip === ip) ? names.find((name: any) => name.ip === ip).name : ip
    return goodName
  }

  let id = 0
  const mappedMessages = messages.map((item: any) => {
    id += 1
    const name = nameReplace(item.name)
    return(
      <Message
      key={id} 
      id={id}
      name={name}
      time={item.time.seconds}
      message={item.message} />
    )
  })
  mappedMessages.sort((a: any, b: any) => a.props.time - b.props.time)

  const handleSendMessage = (event: any) => {
    if (event.key === 'Enter') {
      postOne()
      getAllMessages()
    }
  }
  const handleSetName = (event: any) => {
    if (event.key === 'Enter') {
      postName()
      getAllMessages()
    }
  }

  return (
    <div className='app'>
      {mappedMessages}
      <input className='ip' onChange={(event) => {setNameText(event.target.value)}} value={nameText} onKeyDown={handleSetName}  />
      <span>{myIp}</span>
      <input className='textbox' onChange={(event) => {setInputText(event.target.value)}} value={inputText} onKeyDown={handleSendMessage} />
    </div>
  )
}
