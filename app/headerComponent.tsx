import { useState } from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPaintRoller, faCircleDown } from '@fortawesome/free-solid-svg-icons'

interface HeaderProps {
  scrollDown: any,
  isScrolledDown: boolean,
  claimName: any,
  selectEffect: any
}

export default function Header(props: HeaderProps) {

  const scrollVisibility = props.isScrolledDown ? 'hidden' : 'visible'

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
      <FontAwesomeIcon style={{ visibility: scrollVisibility }} onClick={props.scrollDown} className='icon' icon={faCircleDown} />
    </div>
  )
}
