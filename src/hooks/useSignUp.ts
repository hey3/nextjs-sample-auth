import { useCallback, useState } from 'react'
import Router from 'next/router'

export type SignUpParams = {
  name: string
  email: string
  password: string
  isSignUp: boolean
}

export type SignUpResult = {
  name: string
}

const useSignUp = (): {
  isLoading: boolean
  signUp: (signUpParams: SignUpParams) => void
  result: SignUpResult | null
  error: string
} => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [result, setResult] = useState<SignUpResult | null>(null)
  const [error, setError] = useState<string>('')

  const signUp = useCallback((signUpParams: SignUpParams) => {
    setIsLoading(true)
    fetch('/api/authenticate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...signUpParams,
      }),
    })
      .then(res => {
        console.log(res)
        if (!res.ok) {
          return res.text().then(error => Promise.reject(error))
        }
        return res.json()
      })
      .then(json => {
        setIsLoading(false)
        setResult(json)
        return Router.reload()
      })
      .catch(error => setError(error))
  }, [])

  return { isLoading, signUp, result, error }
}

export default useSignUp
