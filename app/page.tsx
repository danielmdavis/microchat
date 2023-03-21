'use client'
import _ from 'lodash'
import { useState, useEffect, useRef } from 'react'
import Message from './messageComponent'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

export default function Home() {

  let [messages, setMessages]: any[] = useState([])
  let [names, setNames]: any[] = useState([])
  let [inputText, setInputText] = useState('')
  let [myIp, setMyIp] = useState('')
  let [nameText, setNameText] = useState('')

  const bottom: any = useRef(null)

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

  const messagesCollection = collection(db, 'messages')
  const query = useCollectionData(messagesCollection)
  console.log(query)

  const getAllMessages = async () => {
    const messagesCollection = collection(db, 'messages')
    const query = await getDocs(messagesCollection)
    const messagesList = query.docs.map((doc: any) => doc.data())
    setMessages(messagesList)
  }
  const getAllNames = async () => {
    const namesCollection = collection(db, 'names')
    const query = await getDocs(namesCollection)
    const namesList = query.docs.map((doc: any) => doc.data())
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
    if (!names.find((nomen: any) => nomen.name === nameText)) {
      await setDoc(doc(db, 'names', myIp), {
        name: nameText,
        ip: myIp
      })
      getAllNames()
    }
  }


  useEffect(() => { 
      getAllMessages()
      getAllNames()
      getMyIp()
      const sendMessage = document.getElementById('sendMessage')
      if (sendMessage !== null) { sendMessage.blur() }
  }, [])

  const getMyIp = () => {
    fetch('https://api64.ipify.org?format=json', {
  })
    .then(req => req.json())
    .then(res => {
      setMyIp(res.ip)
      setNameText(res.ip)
    })
  }

  const nameTextReplace = (ip: string) => {
    // const goodName = names.find((name: any) => name.ip === ip) ? names.find((name: any) => name.ip === ip).name : ip
    let goodName: string 
    let nameStyle: string
    if (names.find((nomen: any) => nomen.ip === ip)) {
      goodName = names.find((nomen: any) => nomen.ip === ip).name
      nameStyle = 'name-good'
    } else {
      goodName = ip.substring(0,15)
      nameStyle = 'name-ip'
    }
    return [goodName, nameStyle]
  }

  let id = 0
  const mappedMessages = messages.map((item: any) => {
    id += 1
    const [nomen, nameStyle] = nameTextReplace(item.name)
    return(
      <Message
      key={id} 
      id={id}
      name={nomen}
      nameStyle={nameStyle}
      time={item.time.seconds}
      message={item.message} />
    )
  })
  mappedMessages.sort((a: any, b: any) => a.props.time - b.props.time)

  const handleSendMessage = (event: any) => {
    if (event.key === 'Enter') {
      postOne()
      getAllMessages()
      bottom.current?.scrollIntoView() //fucked
    }
  }
  const handleSetName = (event: any) => {
    if (event.key === 'Enter') {
      postName()
      getAllNames()
      const nameClaim = document.getElementById('nameClaim')
      if (nameClaim !== null) { nameClaim.blur() }
    }
  }

  return (
    <div className='app'>
      <br /><br />
      <div className='outer-wrapper'><div className='outer-div'>
        <div className='message-scroll'>
          {mappedMessages}
          <span className='hidden-end' ref={bottom} />
        </div></div>
      </div>
      <div style={{ height: '90px' }} /> 
      <div className='footer'>
        <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={nameText} onKeyDown={handleSetName} maxLength={16} />&nbsp;&nbsp;
        <span style={{ fontSize: '1.25em', fontStyle: 'italic' }}>claim a name</span>
        <br />
        <input id='sendMessage' className='textbox' enterKeyHint='go' onChange={(event) => {setInputText(event.target.value)}} value={inputText} onKeyDown={handleSendMessage} />
      </div>
    </div>
  )
}
