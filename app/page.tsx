'use client'
import _ from 'lodash'
import { useState, useEffect, useRef, useMemo } from 'react'
import Message from './messageComponent'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

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

  // not using for data, just for sync. bc while I have parsing working for this hook it can only work in the top level scope, 
  // in which case it can't be made to set state without an infinite loop, prevention of which also blocks the open listening 
  // which is the whole point. so instead it's simply used to register a change and fire the old method.
  const messagesChange: any = useCollection(collection(db, 'messages')) 
  const namesChange: any = useCollection(collection(db, 'names'))
  // const messagesList = messagesChange[0]?._snapshot.docChanges
  // const parsedMessages = messagesList?.map((item: any) => {
  //   const doc = item.doc.data.value.mapValue.fields
  //   return ({
  //     name : doc.name.stringValue,
  //     time: new Date(doc.time.timestampValue).getTime(),
  //     message: doc.message.stringValue
  //   })
  // })
  
  const getAllMessages = async () => { //gets and sets
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
  
  useMemo(() => { // gets and sets as described above. efficiency issues should never present meaningful issues.
    getAllMessages() 
    getAllNames()
  }, [messagesChange, namesChange])

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
    }
  }

  useEffect(() => { 
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
  let mappedMessages = messages?.map((item: any) => {
  id += 1
  const [nomen, nameStyle] = nameTextReplace(item?.name)
  return(
    <Message
    key={id} 
    id={id}
    name={nomen}
    nameStyle={nameStyle}
    time={item.time}
    message={item.message} />
    )
  })
  mappedMessages?.sort((a: any, b: any) => a.props.time - b.props.time)
      
  const handleSendMessage = (event: any) => {
    if (event.key === 'Enter') {
      postOne()
      bottom.current?.scrollIntoView() //fucked, next target
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
