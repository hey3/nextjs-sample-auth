import { FC, Fragment } from 'react'
import styled from 'styled-components'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import useSignUp, { SignUpParams, SignUpResult } from '../hooks/useSignUp'
import Loading from './Loading'

type ContainerProps = {
  className?: string
  children?: never
}

type PresenterProps = {
  isLoading: boolean
  signUp: (signUpParams: SignUpParams) => void
  result: SignUpResult | null
  error: string
}

type Props = ContainerProps & PresenterProps

type SignUpFormValues = {
  name: string
  email: string
  password: string
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required'),
})

const DomComponent: FC<Props> = ({ signUp, error, isLoading }) => {
  const initialValues: SignUpFormValues = { name: '', email: '', password: '' }
  return (
    <Fragment>
      {isLoading && <Loading />}
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        validateOnChange={true}
        onSubmit={(values, actions) => {
          signUp({ ...values, isSignUp: true })
          actions.setSubmitting(false)
        }}
      >
        {({ errors, touched, isSubmitting, dirty, isValid }) => (
          <Form className="form">
            <label className="form-input" htmlFor="name">
              <div>
                Name{' '}
                {errors.name && touched.name ? (
                  <span className="error">- {errors.name}</span>
                ) : null}
              </div>
              <Field type="text" id="name" name="name" placeholder="Type your name" />
            </label>
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
              SignUp
            </button>
            <div className="error-response">{error && <span className="error">{error}</span>}</div>
          </Form>
        )}
      </Formik>
    </Fragment>
  )
}

const StyledComponent = styled(DomComponent)``

const SignUpForm: FC<ContainerProps> = props => {
  const { isLoading, signUp, result, error } = useSignUp()
  const presenterProps: PresenterProps = {
    isLoading,
    signUp,
    result,
    error,
  }
  return <StyledComponent {...presenterProps} {...props} />
}

export default SignUpForm
