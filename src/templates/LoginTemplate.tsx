import { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'

import SignUpForm from '../components/SignUpForm'
import LoginForm from '../components/LoginForm'

type ContainerProps = {
  className?: string
  isSignUp: boolean
  setIsSignUp: Dispatch<SetStateAction<boolean>>
  children?: never
}

type PresenterProps = Record<string, unknown>

type Props = ContainerProps & PresenterProps

const DomComponent: FC<Props> = ({ className, isSignUp, setIsSignUp }) => {
  return (
    <div className={className}>
      <div className="login-form">
        <h1 className="title">{isSignUp ? 'SignUp' : 'Login'}</h1>
        {isSignUp ? <SignUpForm /> : <LoginForm />}
        <div className="sign-up-description">
          Need an account?
          <div>Check sign up checkbox.</div>
        </div>
        <div className="sign-up-checkbox">
          <label>
            <input type="checkbox" checked={isSignUp} onChange={() => setIsSignUp(!isSignUp)} />
            Sign up
          </label>
        </div>
      </div>
    </div>
  )
}

const StyledComponent = styled(DomComponent)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(50deg, #2196f3 20%, #e300eb 90.71%);

  .title {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
  }

  .login-form {
    display: block;
    background-color: #f8f9f9;
    border: 1px solid #f8f9f9;
    box-shadow: 2px 4px 10px 7px rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    border-radius: 0.5rem;
    width: 30rem;

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 3rem 2rem 0 2rem;
      height: 25rem;
      user-select: none;

      .form-input {
        display: flex;
        flex-direction: column;
        font-size: 0.9rem;
        width: 100%;

        & > div {
          cursor: default;
        }

        &:not(:first-child) {
          margin-top: 1rem;
        }

        > input {
          font-size: 1.2rem;
          line-height: 3rem;
          border-bottom: 1px solid black;

          &:focus {
            border-bottom: 1px solid #9ecaed;
          }
        }
      }

      .submit-button {
        margin-top: 2rem;
        background-color: #06aee6;
        width: 100%;
        text-align: center;
        color: #f8f9f9;
        height: 3rem;
        border-radius: 0.15rem;

        &:hover,
        &:focus {
          background-color: #0290bf;
          outline: none;
          border-color: #9ecaed;
          box-shadow: 0 0 10px #9ecaed;
        }

        &:disabled {
          background-color: darkgray;
          outline: none;
          border-color: unset;
          box-shadow: unset;
          cursor: not-allowed;
        }
      }

      .error-response {
        text-align: center;
        margin-top: 1rem;
      }

      .error {
        color: red;
      }
    }

    & .sign-up-description {
      text-align: center;
      font-size: 1.2rem;
      font-weight: 400;

      & > div {
        font-size: 1rem;
        font-weight: 200;
        margin-top: 0.5rem;
      }
    }

    & .sign-up-checkbox {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 1rem 0;
      user-select: none;

      & > label > input {
        margin-right: 0.5rem;
      }
    }
  }
`

const LoginTemplate: FC<ContainerProps> = props => {
  return <StyledComponent {...props} />
}

export default LoginTemplate
