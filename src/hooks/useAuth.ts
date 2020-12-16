import { useCallback, useState } from 'react'
import Cookies from 'js-cookie'
import Router from 'next/router'

import routes from '../routes'

export type LoginParams = {
  name?: string
  email: string
  password: string
  isSignUp: boolean
}

const useLogin = (): {
  isLoading: boolean
  login: (loginParams: LoginParams) => void
  logout: () => void
  error: string
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const login = useCallback((loginParams: LoginParams) => {
    setIsLoading(true)
    fetch(`/api/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...loginParams,
      }),
    })
      .then(res => {
        if (!res.ok) {
          return res.text().then(error => Promise.reject(error))
        }
        return res.text()
      })
      .then(token => {
        Cookies.set('_wsp', token, {
          expires: 1,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
        })
      })
      .then(() => {
        setIsLoading(false)
        return Router.push(routes.root)
      })
      .catch(error => {
        setIsLoading(false)
        setError(error)
      })
  }, [])

  const logout = (): void => {
    Cookies.remove('_wsp')
    Router.reload()
  }

  return { isLoading, login, logout, error }
}

export default useLogin
