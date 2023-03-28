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
        {children}
      </body>
    </html>
  )
}
