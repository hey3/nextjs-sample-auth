import { useState } from 'react'
import { GetServerSideProps } from 'next'

import LoginTemplate from '../templates/LoginTemplate'
import { validateTokenCookie } from '../helpers/withAuth'

const Login = (): JSX.Element => {
  const [isSignUp, setIsSignUp] = useState(false)
  return <LoginTemplate isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
}

export default Login

export const getServerSideProps: GetServerSideProps = async ctx => {
  const {
    req: { headers },
    res,
  } = ctx

  const isAuthenticated = await validateTokenCookie(headers)

  if (isAuthenticated) {
    res.setHeader('Location', '/')
    res.statusCode = 307
  }

  return { props: {} }
}
