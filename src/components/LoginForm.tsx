import { FC, Fragment } from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import useAuth, { LoginParams } from '../hooks/useAuth'
import Loading from './Loading'

type ContainerProps = {
  className?: string
  children?: never
}

type PresenterProps = {
  isLoading: boolean
  login: (loginParams: LoginParams) => void
  error: string
}

type Props = ContainerProps & PresenterProps

type LoginFormValues = {
  email: string
  password: string
}

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

const DomComponent: FC<Props> = ({ className, login, error, isLoading }) => {
  const initialValues: LoginFormValues = { email: '', password: '' }
  return (
    <Fragment>
      {isLoading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          login({ ...values, isSignUp: false })
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched, isSubmitting, dirty, isValid }) => (
          <Form className={`form ${className}`}>
            <label className="form-input" htmlFor="email">
              <div>
                Mail Address{' '}
                {errors.email && touched.email ? (
                  <span className="error">- {errors.email}</span>
                ) : null}
              </div>
              <Field type="text" id="email" name="email" placeholder="Type your email" />
            </label>
            <label className="form-input" htmlFor="password">
              <div>
                Password{' '}
                {errors.password && touched.password ? (
                  <span className="error">- {errors.password}</span>
                ) : null}
              </div>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Type your password"
              />
            </label>
            <button
              className="submit-button"
              type="submit"
              disabled={isSubmitting || !dirty || !isValid}
            >
              Login
            </button>
            <div className="error-response">{error && <span className="error">{error}</span>}</div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

const StyledComponent = styled(DomComponent)``

const LoginForm: FC<ContainerProps> = props => {
  const { isLoading, login, error } = useAuth()
  const presenterProps: PresenterProps = {
    isLoading,
    login,
    error,
  }
  return <StyledComponent {...presenterProps} {...props} />
}

export default LoginForm
