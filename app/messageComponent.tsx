import Link from 'next/link'

interface MessageProps {
  id: number,
  name: string,
  message: string,
  time: number,
  nameStyle: string,
  color: string
}

export default function Message(props: MessageProps) {

  return (
      <div className='message'>
        <div><span className={props.nameStyle}>{props.name}</span><span style={{ color: `${props.color}`}}> &nbsp;{props.message} </span></div>
      </div>
  )
}
