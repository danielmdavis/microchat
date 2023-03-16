import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'

import InnerHome from './statefulChild'

export default function Home() {

  // firebase.initializeApp({
  //   apiKey: "AIzaSyB-lNG6danS5wodEmWpVEmTFbcesdx3qfE",
  //   authDomain: "microchat-30c83.firebaseapp.com",
  //   projectId: "microchat-30c83",
  //   storageBucket: "microchat-30c83.appspot.com",
  //   messagingSenderId: "198227390543",
  //   appId: "1:198227390543:web:f778007893bed6bf2b3a3a",
  //   measurementId: "G-G6QEH32V7G"
  // })

  // const firestore = firebase.firestore()

  // const getAll = () => {
  //   const messageRef = firestore.collection('messages')
  //   const query = messageRef.get()
  //   const [allMessages]: object[] = useCollectionData(query)
  //   console.log(allMessages)
  // }
  // getAll()


  return (
    <main>
      <InnerHome />
    </main>
  )
}
