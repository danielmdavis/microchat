import './globals.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faPaintRoller } from '@fortawesome/free-solid-svg-icons'

export const metadata = {
  title: 'Micro Chat',
  description: 'converse with e-friends',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className='header-container'>
          <div className='title'>&nbsp;&nbsp;Web Chat&nbsp;&nbsp;</div>
          <FontAwesomeIcon className='icon' icon={faUser} />
          <FontAwesomeIcon className='icon' icon={faPaintRoller} />
        </div>
        {children}
      </body>
    </html>
  )
}
