import Link from 'next/link'

interface LandlordProps {
  name: string,
  message: string
}

export default function Message(props: LandlordProps) {

  return (
      <div className='message'>
        <div><span className='name'>{props.name}</span> {props.message}</div>
      </div>
  )
}
