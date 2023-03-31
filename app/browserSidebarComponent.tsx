import { useEffect, useState } from 'react'

interface SidebarProps {
  allUsers: any,
  currentUser: any
}

export function Sidebar(props: SidebarProps) {

  const name = props.currentUser?.name
  const ip = props.currentUser?.ip
  
  let id = 0
  const userList = props.allUsers.map((user: any) => {
    id += 1
    return (
      <div key={id} style={{ color: user.color }}>{user.name}</div>
    )
  })

  return (
    <div className='sidebar'>
      <br />
      <div className='sidebar-title'>welcome to internet.</div>
      you are <span style={{ fontStyle: 'italic' }}>{name}</span>. <br /> 
      your account is linked to <span style={{ fontStyle: 'italic' }}>{ip}</span>.
      <br /><br />
      <div className='sidebar-title'>all users ever</div>
      {userList}
      <br />
      <div style={{ fontStyle: 'italic' }} className='sidebar-title'>sidebar is a wip</div>
    </div>
  )
}

