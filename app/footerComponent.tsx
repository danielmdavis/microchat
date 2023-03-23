import Link from 'next/link'

interface FooterProps {
  isMobile: boolean,
  nameText: string,
  inputText: string,
  setNameText: Function,
  setInputText: Function
  sendMessage: Function,
  setName: Function
}

export default function Footer(props: FooterProps) {

  if (props.isMobile) {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />
          <button className='mobile-submit'>↵</button>&nbsp;
          <div className='label' style={{ width: '50px' }}>claim a name</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
          <button className='mobile-submit' style={{ marginBottom: '6px'}}>↵</button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='footer'>
        <div className='footer-inner'>
          <input id='nameClaim' className='ip' enterKeyHint='go' onChange={(event) => {props.setNameText(event.target.value)}} onFocus={(event) => {event.target.select()}} value={props.nameText} onKeyDown={props.setName} maxLength={16} />
          <button className='mobile-submit'>↵</button>&nbsp;
          <div className='label' style={{ width: '50px' }}>claim a name</div>
        </div>
        <div className='footer-inner'>
          <input id='sendMessage' className='textbox' enterKeyHint='go' onChange={(event) => {props.setInputText(event.target.value)}} value={props.inputText} onKeyDown={props.sendMessage} />
          <button className='mobile-submit' style={{ marginBottom: '6px'}}>↵</button>
        </div>
      </div>
    )
  }
}
