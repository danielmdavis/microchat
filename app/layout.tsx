import './globals.css'

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
        <div className='title'>&nbsp;&nbsp;Web Chat</div>
        {children}
      </body>
    </html>
  )
}
