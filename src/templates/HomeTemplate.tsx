import { FC } from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'

export type User = {
  name: string
}

type ContainerProps = {
  className?: string
  user: User
  children?: never
}

type PresenterProps = Record<string, unknown>

type Props = ContainerProps & PresenterProps

const DomComponent: FC<Props> = ({ className, user }) => (
  <Layout>
    <div className={className}>
      {user && user.name ? <h1>{`Welcome ${user.name} !`}</h1> : <h1>Loading...</h1>}
    </div>
  </Layout>
)

const StyledComponent = styled(DomComponent)`
  margin: 2rem;
  padding-left: 2rem;
  font-size: 1.5rem;
`

const HomeTemplate: FC<ContainerProps> = props => {
  return <StyledComponent {...props} />
}

export default HomeTemplate
