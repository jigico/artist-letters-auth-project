import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderContainer } from './HeaderStyles'

export default function Header() {
  return (
    <HeaderContainer>
      <h1>
        <Link to='./'>ARTIST</Link>
      </h1>
    </HeaderContainer>
  )
}
