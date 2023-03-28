import Link from 'next/link'

interface FooterProps {
  isMobile: boolean,
  nameClaim: boolean,
  nameText: string,
  inputText: string,
  setNameText: any,
  setInputText: any,
  sendMessage: any,
  setName: any,
  clickSendMessage: any,
  clickSetName: any
}



export function NameFooter(props: FooterProps) {

  if (props.isMobile) {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />
          <button className='mobile-submit' onClick={props.clickSetName}>↵</button>&nbsp;
          <div className='label' style={{ width: '50px' }}>claim a name</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
          <button className='mobile-submit' style={{ marginBottom: '6px'}} onClick={props.clickSendMessage}>↵</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />&nbsp;
          <div style={{ fontSize: '1.25em', fontStyle: 'italic'}}>claim a name</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox-browser' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
        </div>
      </div>
    )
  }
}

export function EffectFooter(props: FooterProps) {

  if (props.isMobile) {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />
          <button className='mobile-submit' onClick={props.clickSetName}>↵</button>&nbsp;
          <div className='label' style={{ width: '60px' }}>select an effect</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
          <button className='mobile-submit' style={{ marginBottom: '6px'}} onClick={props.clickSendMessage}>↵</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />&nbsp;
          <div style={{ fontSize: '1.25em', fontStyle: 'italic'}}>select an effect</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox-browser' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
        </div>
      </div>
    )
  }
}
