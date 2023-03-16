import Link from 'next/link'

interface MessageProps {
  id: number,
  name: string,
  message: string
}

export default function Message(props: MessageProps) {

  return (
      <div className='message'>
        <div><span className='name'>{props.name}</span> {props.message}</div>
      </div>
  )
}
