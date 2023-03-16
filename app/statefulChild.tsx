'use client'
import { useState, useEffect } from 'react'
import Message from './messageComponent'
import messageJson from './messages.json'


// import firebase from 'firebase/compat/app'
// import { getFirestore, query, collection } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, addDoc } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'


export default function InnerHome() {

  let [messages, setMessages] = useState([])
  let [inputText, setInputText] = useState('')
  let [myIp, setMyIp] = useState('')

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

  const getAll = async () => {
    const messagesCollection = collection(db, 'messages')
    const query = await getDocs(messagesCollection)
    const messagesList = query.docs.map(doc => doc.data());
    // const [allMessages]: object[] = useCollectionData(messagesCollection)
    setMessages(messagesList)
  }

  const postOne = async () => {
    await addDoc(collection(db, 'messages'), {
      name: myIp,
      message: inputText,
      time: new Date()
    })
    setInputText('')
  }

  useEffect(() => { 
    getAll()
    getMyIp()
  })

  const getMyIp = () => {
    fetch('https://api64.ipify.org?format=json', {
  })
    .then(req => req.json())
    .then(res => {
      setMyIp(res.ip)
    })
  }

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
      // messages.push({ 'name': myIp, 'message': inputText, 'time': new Date() })
      postOne()

    }
  }

  return (
    <div className='app'>
      {mappedMessages}
      <div className='ip'>{myIp}</div>
      <input className='textbox' onChange={(event) => {setInputText(event.target.value)}} value={inputText} onKeyDown={handleKeyDown} />
    </div>
  )
}
