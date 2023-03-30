import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPaintRoller } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  claimName: any,
  selectEffect: any
}

export default function Header(props: HeaderProps) {


  let nameSelected = ''
  let effectSelected = ''
  // if (props.claimName) {
  //   nameSelected = 'selected'
  // } else {
  //   console.log('foo')
  //   effectSelected = 'selected'
  // }

  return (
    <div className='header-container'>
      <div className='title'>&nbsp;&nbsp;Web Chat&nbsp;&nbsp;</div>
      <FontAwesomeIcon onClick={props.claimName} className={`icon ${nameSelected}`} icon={faUser} />
      <FontAwesomeIcon onClick={props.selectEffect} className={`icon ${effectSelected}`} icon={faPaintRoller} />
    </div>
  )
}
