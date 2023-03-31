'use client'
// import { useEffect, useState } from 'react'
import BottomButton from './bottomButtonComponent'

interface FooterProps {
  nameClaim: boolean,
  nameText: string,
  setNameText: any,
  inputText: string,
  setInputText: any,
  colorText: string,
  setColorText: any,
  setColor: any,
  sendMessage: any,
  setName: any,
  clickSendMessage: any,
  clickSetName: any,
  clickSetColor: any,
  scrollDown: any,
  isScrolledDown: boolean
}

export function NameFooter(props: FooterProps) {

  return (
    <div className='footer'>
      <div className='footer-inner'>
        <input id='nameClaim' className='ip' enterKeyHint='go' 
        onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} 
        value={props.nameText} onKeyDown={props.setName} maxLength={20} />&nbsp;
        <div style={{ fontSize: '1.25em', fontStyle: 'italic'}}>claim a name</div>
        <BottomButton scrollDown={props.scrollDown} isScrolledDown={props.isScrolledDown} />
      </div>
      <div className='footer-inner'>
        <input autoComplete='off' id='sendMessage' className='textbox-browser' enterKeyHint='go' 
        onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
      </div>
    </div>
  )
}

export function EffectFooter(props: FooterProps) {
  return (
    <div className='footer'>
      <div className='footer-inner'>
        <input id='nameClaim' className='ip' enterKeyHint='go' 
        onChange={(event) => {props.setColorText(event.target.value)}} onFocus={(event) => {event.target.select()}} 
        value={props.colorText} onKeyDown={props.setColor} maxLength={35} />&nbsp;
        <div style={{ fontSize: '1.25em', fontStyle: 'italic'}}>select an effect</div>
        <BottomButton scrollDown={props.scrollDown} isScrolledDown={props.isScrolledDown} />
      </div>
      <div className='footer-inner'>
        <input autoComplete='off' id='sendMessage' className='textbox-browser' enterKeyHint='go' 
        onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
      </div>
    </div>
  )
}
