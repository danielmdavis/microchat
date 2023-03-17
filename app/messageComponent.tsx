import Link from 'next/link'

interface MessageProps {
  id: number,
  name: string,
  message: string,
  time: number
}

export default function Message(props: MessageProps) {

  return (
      <div className='message'>
        <div><span className={props.nameStyle}>{props.name}</span> {props.message} </div>
      </div>
  )
}
