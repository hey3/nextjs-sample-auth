import { FC } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import useAuth from '../hooks/useAuth'

type ContainerProps = {
  className?: string
  children?: never
}

type PresenterProps = {
  logout: () => void
}

type Props = ContainerProps & PresenterProps

const DomComponent: FC<Props> = ({ className, logout }) => (
  <header className={className}>
    <h1 className="title">
      <Link href="/" passHref>
        <a>Sample Console</a>
      </Link>
    </h1>
    <button className="logout-button" onClick={logout}>
      Logout
    </button>
  </header>
)

const StyledComponent = styled(DomComponent)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #2b314f;
  border-bottom: 1px solid #03082b;
  position: fixed;
  width: 100%;
  height: 4rem;
  z-index: 1;

  & .title {
    font-size: 1.4rem;
    font-weight: 700;
    margin-left: 20px;
    color: #f2f2f2;
    text-shadow: 1px 1px 1px grey;
  }

  & .logout-button {
    color: #f2f2f2;
    font-weight: 400;
    cursor: pointer;
    padding: 0.5rem 1rem;
  }
`

const Header: FC<ContainerProps> = () => {
  const { logout } = useAuth()

  const presenterProps: PresenterProps = {
    logout,
  }
  return <StyledComponent {...presenterProps} />
}

export default Header
