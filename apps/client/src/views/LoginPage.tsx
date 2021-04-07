import React from 'react'
import styled from '@emotion/styled'
import { Container } from 'components/Container'
import { Glass } from 'components/Glass'
import { PrimaryButton } from 'components/Buttons'
import { useForm } from 'react-hook-form'
import { LoginPayload, LoginSchema } from 'lib/validations/LoginPage'
import { yupResolver } from '@hookform/resolvers/yup'
import { useStore } from 'lib/State'
import { LoginResponse } from 'lib/types/LoginResponse'
import { APP_URL, TUTEN_APP_TYPE, TUTEN_ENDPOINT } from 'env'

const LoginContainer = styled(Container)({
  background:
    'linear-gradient(54deg, rgba(121,42,196,1) 20%, rgba(45,198,214,1) 100%)',
})

const LoginCard = styled(Glass)({
  color: 'white',
  padding: '15px 30px',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  textAlign: 'center',
})

const LoginTitle = styled.h3({
  color: 'white',
  fontWeight: 'bold',
  margin: '0 0 1rem 0',
})

const Form = styled.form({
  width: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

const Input = styled.input({
  marginBottom: '1rem',
  height: '1.75rem',
  background: 'rgba( 255, 255, 255, 0.05 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur( 7.5px )',
  borderRadius: '50px',
  padding: 5,
  width: '15rem',
  paddingLeft: 10,
  fontWeight: 'bold',
  color: '#f1f1f1',
  border: '1px solid rgba( 255, 255, 255, 0.18 )',
  '::placeholder': {
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  ':focus': {
    outline: 'none',
  },
  error: {
    boxShadow: '0 8px 32px 0 rgba( 220, 20, 60, 0.37 ) !important',
    border: '1px solid rgba( 220, 20, 60, 0.18 ) !important',
  },
})

const ErrorLabel = styled.p({
  color: 'crimson',
  margin: 0,
  fontWeight: 'bold',
})

export const LoginPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, touchedFields },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: 'onChange',
  })

  const Store = useStore()

  const onSubmit = async (payload: LoginPayload) => {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    headers.append('Accept', 'application/json')
    headers.append('Origin', APP_URL)
    headers.append('app', TUTEN_APP_TYPE)
    headers.append('password', payload.password)
    try {
      const response = await fetch(`${TUTEN_ENDPOINT}${payload.email}`, {
        headers,
        method: 'PUT',
      })
      if (response.status === 200) {
        Store.setUser((await response.json()) as LoginResponse)
      } else {
        setError('password', { message: 'Email o clave invalida' })
      }
    } catch (error) {
      console.log('error')
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <LoginTitle>Problem 3</LoginTitle>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            placeholder="Email"
            autoComplete="off"
            {...register('email')}
          />
          <Input
            type="password"
            autoComplete="off"
            placeholder="Password"
            {...register('password')}
          />
          <ErrorLabel>
            {errors?.email?.message || errors?.password?.message}
          </ErrorLabel>
          <PrimaryButton type="submit"> LOG IN</PrimaryButton>
        </Form>
      </LoginCard>
    </LoginContainer>
  )
}
