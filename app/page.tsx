'use client'
import _ from 'lodash'
import { useState, useEffect, useMemo, useRef } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, doc, addDoc, setDoc } from 'firebase/firestore'
import { useCollection } from 'react-firebase-hooks/firestore'

import Header from './headerComponent'
import Message from './messageComponent'
import { Sidebar } from './browserSidebarComponent'
import { NameFooter, EffectFooter } from './footerComponent'
import { MobileNameFooter, MobileEffectFooter } from './mobileFooterComponent'

export default function Home() {

  let [myIp, setMyIp] = useState('')
  let [user, setUser] = useState({ ip: '', name: '', color: ''})
  let [inputText, setInputText] = useState('') // sets text entry into state
  let [messages, setMessages]: any[] = useState([]) // pulls and updates all
  let [colorText, setColorText] = useState('white')
  let [claimName, setClaimName] = useState(true) // sets claim name mode
  let [nameText, setNameText] = useState('') // sets text entry into state
  let [names, setNames]: any[] = useState([]) // pulls and updates all
  let [atBottom, setAtBottom] = useState(false)
  let [isMobile, setIsMobile] = useState(false)
  let [sidebarMaxHeight, setSidebarMaxHeight] = useState(0)

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
  // which is the whole point. so instead it's simply used to register a change and fire the conventional getter hook.
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
  
  // middleware get current user method
  const getUser = () => {
    const user = names.find((nomen: any) => nomen.ip === myIp) 
    setUser(user)
  }

  // middleware get all method
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
    getUser()
  }
  
  // middleware post one methods
  const postOne = async () => {
    const color = user?.color !== undefined ? user.color : 'white'
    if (inputText.length > 0) {
      await addDoc(collection(db, 'messages'), {
        name: myIp,
        message: inputText,
        time: new Date(),
        color: color
      })
    }
    setInputText('')
  }
  const postName = async () => {
    const currentUser = names?.find((user: any) => user.ip === myIp) 
    const color = currentUser.color ? currentUser.color : ''
    if (!names.find((nomen: any) => nomen.name === nameText) && nameText.length > 0) {
      await setDoc(doc(db, 'names', myIp), {
        name: nameText,
        ip: myIp,
        color: color
      })
    }
  }
  const postColor = async () => {
    const currentUser = names?.find((user: any) => user.ip === myIp) 
    const nomen = currentUser.name ? currentUser.name : currentUser.ip
    await setDoc(doc(db, 'names', myIp), {
      ip: myIp,
      name: nomen,
      color: colorText
    })
  }

  // get from external
  const getMyIp = () => {
    fetch('https://api64.ipify.org?format=json', {
  })
    .then(req => req.json())
    .then(res => {
      setMyIp(res.ip)
      setNameText(res.ip)
    })
  }

  const compareForUpdate = () => {
    const messagesList = messagesChange[0]?.docs
    const diffOfMessages = messages?.length - messagesList?.length
    const namesList = namesChange[0]?.docs
    const diffOfNames = names?.length - namesList?.length
    const changeOfNames = _.isMatch(names?.map((item: any) => item.name), namesList?.map((item: any) => item._document.data.value.mapValue.fields.name.stringValue))
    const changeOfColors = _.isMatch(names?.map((item: any) => item.color), namesList?.map((item: any) => item._document.data.value.mapValue.fields.color?.stringValue))
    const difference = !!Math.abs(diffOfMessages) || !!Math.abs(diffOfNames) || !changeOfColors || !changeOfNames
    return difference
  }

  // runs middleware get all methods
  useEffect(() => { // gets and sets as described above. efficiency issues should never present meaningful problem at anticipated scale
    getMyIp()
    getUser()
    const messagesHeight = document.getElementById('outerWrapper')?.clientHeight
    if (messagesHeight !== undefined) {
      setSidebarMaxHeight(messagesHeight)
    }   
    const sendMessage = document.getElementById('sendMessage')
    if (sendMessage !== null) { sendMessage.blur() }
    const mobility = navigator?.userAgentData?.mobile
    if (mobility) {
      setIsMobile(mobility)
    }
    console.log('Get user data')
  }, [])
  useMemo(() => {    
    getAllMessages() 
    getAllNames()
    getUser()
    console.log('Get message data')
  }, [compareForUpdate()])

  // jsx builders
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
  const color = item.color ? item.color : 'white'
  return(
    <Message
    key={id} 
    id={id}
    color={color}
    name={nomen}
    nameStyle={nameStyle}
    time={item.time}
    message={item.message} />
    )
  })
  mappedMessages?.sort((a: any, b: any) => a.props.time - b.props.time)
  
  //header listeners
  const handleClaimName = (event: any) => {
    setClaimName(true)
  }
  const handleSelectEffect = (event: any) => {
    setClaimName(false)
  }
  //    //
  const handleScrollDown = (event: any) => {
    bottom.current?.scrollIntoView(false)
  }
  const handleCheckIfScrolledDown = (event: any) => {
   if (bottom.current?.getBoundingClientRect().top > 1050) {
    setAtBottom(false)
   } else {
    setAtBottom(true)
   }
  }

  // footer listeners
  const handleSendMessage = (event: any) => {
    if (event?.key === 'Enter') {
      postOne()
      const innerMessages = document.getElementById('innerMessages')
      // setTimeout(() => {innerMessages?.scroll(0, 50000)}, 5)
      setTimeout(() => {bottom.current?.scrollIntoView(false)  }, 5)
    } else if (event?.key === 'ArrowDown') {
      bottom.current?.scrollIntoView(false)      
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
  const handleSetColor = (event: any) => {
    if (event.key === 'Enter') {
      postColor()
      getAllNames()
      const nameClaim = document.getElementById('nameClaim')
      if (nameClaim !== null) { nameClaim.blur() }
    }
  }
  // footer listeners (button)
  const handleClickSendMessage = (event: any) => {
    postOne()
  }
  const handleClickSetName = (event: any) => {
    postName()
    getAllNames()
    const nameClaim = document.getElementById('nameClaim')
    if (nameClaim !== null) { nameClaim.blur() }
  }
  const handleClickSetColor = (event: any) => {
      postColor()
      const nameClaim = document.getElementById('nameClaim')
      if (nameClaim !== null) { nameClaim.blur() }
  }

  let footerSelector: any
  let sidebarToggle: any
  if (isMobile) {
    footerSelector = claimName // share props on the component end, making the jsx side very bloated
    ?
    <MobileNameFooter nameClaim={claimName} 
    sendMessage={handleSendMessage} setName={handleSetName} 
    clickSendMessage={handleClickSendMessage} clickSetName={handleClickSetName} 
    setNameText={setNameText} setInputText={setInputText}
    nameText={nameText} inputText={inputText}
    colorText={colorText} setColor={handleSetColor} clickSetColor={handleClickSetColor} setColorText={setColorText} 
    scrollDown={handleScrollDown} isScrolledDown={atBottom}/>
    :
    <MobileEffectFooter nameClaim={claimName} 
    sendMessage={handleSendMessage} setName={handleSetName} 
    clickSendMessage={handleClickSendMessage} clickSetName={handleClickSetName} 
    setColorText={setColorText} setInputText={setInputText}
    colorText={colorText} setColor={handleSetColor} clickSetColor={handleClickSetColor} inputText={inputText} 
    nameText={nameText} setNameText={setNameText} 
    scrollDown={handleScrollDown} isScrolledDown={atBottom}/>
  } else {
    sidebarToggle = <Sidebar allUsers={names} currentUser={user} maxHeight={sidebarMaxHeight} /> //      //
    footerSelector = claimName
    ?
    <NameFooter nameClaim={claimName} 
    sendMessage={handleSendMessage} setName={handleSetName} 
    clickSendMessage={handleClickSendMessage} clickSetName={handleClickSetName} 
    setNameText={setNameText} setInputText={setInputText}
    nameText={nameText} inputText={inputText}
    colorText={colorText} setColor={handleSetColor} clickSetColor={handleClickSetColor} setColorText={setColorText} 
    scrollDown={handleScrollDown} isScrolledDown={atBottom}/>
    :
    <EffectFooter nameClaim={claimName} 
    sendMessage={handleSendMessage} setName={handleSetName} 
    clickSendMessage={handleClickSendMessage} clickSetName={handleClickSetName} 
    setColorText={setColorText} setInputText={setInputText}
    colorText={colorText} setColor={handleSetColor} clickSetColor={handleClickSetColor} inputText={inputText} 
    nameText={nameText} setNameText={setNameText} 
    scrollDown={handleScrollDown} isScrolledDown={atBottom}/>
  }

  return (
    <div className='sidebar-wrapper'>
    <div className='app'>
      <Header selectEffect={handleSelectEffect} claimName={handleClaimName} />
      <div className='test-border' style={{ height: '38px' }} /> 
        
        <div id='outerWrapper' className='outer-wrapper'><div className='outer-div'>
          <div id='innerMessages' className='message-scroll' onScroll={handleCheckIfScrolledDown}>
            {mappedMessages}
            <div className='hidden-end' ref={bottom}></div>
          </div></div>
        </div>
        <div style={{ height: '90px' }} /> 
        {footerSelector}

      </div>
      {sidebarToggle}
    </div> 
  )
}
