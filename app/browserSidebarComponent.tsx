import { useEffect, useState } from 'react'

interface SidebarProps {
  allUsers: any,
  currentUser: any,
  maxHeight: number
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
    <div className='sidebar' style={{ maxHeight: props.maxHeight }}>
      <div className='sidebar-scroll'>
        <br />
        <div className='sidebar-title'>welcome to internet.</div>
        you are <span style={{ fontStyle: 'italic' }}>{name}</span>. <br /> 
        your account is linked to <span style={{ fontStyle: 'italic' }}>{ip}</span>.
        <br /><br />
        <div className='sidebar-title'>all users ever</div>
        {userList}
        <br />
        <div className='sidebar-title'>tips & tricks</div>
        as an alternative to the [↓] button, press the down arrow on your keyboard while typing in the main text entry to jump to the most recent message. <br /><br />
        this is not generally considered a good long term solution. our top scientists are currently searching for the cure. <br /><br /> 
        <div style={{ fontStyle: 'italic' }} className='sidebar-title'>sidebar is wip</div> <br/>
      </div>
    </div>
  )
}

