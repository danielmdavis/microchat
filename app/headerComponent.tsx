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

  return (
    <div className='header-container'>
      <div className='title'>&nbsp;&nbsp;Web Chat&nbsp;&nbsp;</div>
      <FontAwesomeIcon onClick={props.claimName} className='icon' icon={faUser} />
      <FontAwesomeIcon onClick={props.selectEffect} className='icon' icon={faPaintRoller} />
      <FontAwesomeIcon style={{ visibility: scrollVisibility }} onClick={props.scrollDown} className='icon' icon={faCircleDown} />
    </div>
  )
}
