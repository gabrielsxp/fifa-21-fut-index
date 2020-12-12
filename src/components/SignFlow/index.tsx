import React, { Dispatch, SetStateAction } from 'react'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { useEffect, useState } from 'react'
import Heading from 'components/Heading'
import * as S from './styles'
import InputField from 'components/InputField'
import { Formik, Form } from 'formik'
import { Button } from '@chakra-ui/react'
import { Favorite as FavoriteProps } from 'generated/graphql'
import {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  UsersPermissionsLoginPayload,
  useGetFavoritesLazyQuery,
  useCreateFavoriteMutation
} from 'generated/graphql'
import { getApolloErrors } from 'utils/helpers'
import { useDispatch } from 'react-redux'

export type SignFlowProps = {
  customInitialScreen?: string
  visible?: boolean
  controlFunction: Dispatch<SetStateAction<boolean>>
}

const SignFlow = ({
  visible = false,
  controlFunction,
  customInitialScreen = 'sign-in'
}: SignFlowProps) => {
  const dispatch = useDispatch()

  const [screen, setScreen] = useState<string>(customInitialScreen)
  const [userId, setUserId] = useState<string>('')
  const [apolloErrors, setApolloErrors] = useState<string[]>([])
  useEffect(() => {
    const b = document.querySelector('body')
    if (b) {
      if (visible) {
        b.style.overflow = 'hidden'
      } else {
        b.style.overflow = 'auto'
      }
    }
    setApolloErrors([])
  }, [visible, screen])

  const [loginMutation, { loading: loginLoading }] = useLoginMutation({})

  const [registerMutation, { loading: registerLoading }] = useRegisterMutation(
    {}
  )

  const [
    forgotPasswordMutation,
    { loading: forgotPasswordLoading }
  ] = useForgotPasswordMutation({})

  const [
    resetPasswordMutation,
    { loading: resetPasswordLoading }
  ] = useResetPasswordMutation({})

  const [getFavorites, { data: favoritesData }] = useGetFavoritesLazyQuery({
    fetchPolicy: 'no-cache'
  })

  const [createFavoriteMutation] = useCreateFavoriteMutation({})
  if (favoritesData) {
    if (typeof window !== 'undefined') {
      const gotFavorites = localStorage.getItem('favorites')
      if (!gotFavorites) {
        console.log('favorites: ', favoritesData)
        if (favoritesData?.favorites && favoritesData?.favorites?.length > 0) {
          const favorites = favoritesData?.favorites?.reduce(
            (acc: number[], favorite) => {
              const playersIds = favorite!.players!.map((p) => {
                return parseInt(p!.id ?? '-1')
              })
              acc = acc.concat(playersIds)
              return acc
            },
            []
          )
          let f: FavoriteProps[] = []
          let favorite: FavoriteProps = {}
          f = favoritesData?.favorites?.filter(
            (f) => f && f?.players && f?.players?.length > 0
          ) as FavoriteProps[]
          if (favorites.length > 0) {
            favorite = f[0]
          }
          const objectSet = {
            id: favorite?.id ?? f[0]?.id,
            players: Array.from(new Set(favorites))
          }
          localStorage.setItem('favorites', JSON.stringify(objectSet))
        } else {
          createFavoriteMutation({
            variables: {
              user: userId,
              players: []
            }
          }).then((res) => {
            if (res?.data?.createFavorite) {
              const id = res.data.createFavorite?.favorite?.id
              localStorage.setItem(
                'favorites',
                JSON.stringify({
                  id,
                  players: []
                })
              )
            }
          })
        }
      }
    }
  }

  return (
    <S.Wrapper>
      <S.Overlay visible={visible}>
        <S.IconWrapper>
          <S.IconWrapper onClick={() => controlFunction(false)}>
            <CloseIcon />
          </S.IconWrapper>
        </S.IconWrapper>
        {screen === 'sign-in' ? (
          <S.SignContainer>
            <div>
              <S.TopSection>
                <S.Logo>Fifa 21 Stats</S.Logo>
                <Heading color="dark">Sign in</Heading>
              </S.TopSection>
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                  setApolloErrors([])
                  const { email, password } = values
                  if (email === '') {
                    return setErrors({ email: 'You must fill this field' })
                  }
                  if (password === '') {
                    return setErrors({ password: 'You must fill this field' })
                  }
                  try {
                    const response = await loginMutation({
                      variables: {
                        email,
                        password
                      }
                    })
                    if (response?.data?.login) {
                      const login: UsersPermissionsLoginPayload =
                        response.data.login
                      const token = login.jwt
                      const userData = login.user

                      dispatch({
                        type: 'SET_TOKEN',
                        payload: { token }
                      })

                      dispatch({
                        type: 'SET_USER',
                        payload: { user: userData }
                      })

                      localStorage.setItem('token', JSON.stringify(token))
                      localStorage.setItem('user', JSON.stringify(userData))
                      setUserId(userData.id)
                      try {
                        getFavorites({
                          variables: {
                            where: {
                              users_permissions_user: {
                                id: parseInt(userData.id)
                              }
                            },
                            sort: 'created_at:DESC'
                          }
                        })
                      } catch (error) {
                        console.log('favorite error: ', error)
                        setApolloErrors(
                          Object.assign(
                            [],
                            getApolloErrors(error.graphQLErrors)
                          )
                        )
                      }
                      controlFunction(false)
                    }
                  } catch (error) {
                    setApolloErrors(
                      Object.assign([], getApolloErrors(error.graphQLErrors))
                    )
                  }
                }}
              >
                <Form>
                  <S.FormContainer>
                    <InputField
                      color="black"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      label="E-mail"
                    />
                    <InputField
                      color="black"
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Password"
                    />
                    <S.LocalErrorsContainer>
                      {apolloErrors.length > 0 &&
                        apolloErrors.map((error, index) => {
                          return (
                            <S.LocalError key={index}>{error}</S.LocalError>
                          )
                        })}
                    </S.LocalErrorsContainer>
                    <S.ForgetPassword
                      onClick={() => setScreen('forget-password')}
                    >
                      Forgot your password ? Click here !
                    </S.ForgetPassword>
                    <Button
                      isLoading={loginLoading}
                      colorScheme="blue"
                      size="lg"
                      mb={4}
                      type="submit"
                    >
                      Sign in
                    </Button>
                    <Button
                      onClick={() => setScreen('sign-up')}
                      colorScheme="green"
                      size="lg"
                    >
                      Create an account
                    </Button>
                  </S.FormContainer>
                </Form>
              </Formik>
            </div>
          </S.SignContainer>
        ) : screen === 'sign-up' ? (
          <S.SignContainer>
            <div>
              <S.TopSection>
                <S.Logo>Fifa 21 Stats</S.Logo>
                <Heading color="dark">Sign up</Heading>
              </S.TopSection>
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                  setApolloErrors([])
                  const { username, email, password, confirmPassword } = values
                  if (username === '') {
                    return setErrors({ username: 'You must fill this field' })
                  } else if (username.length <= 3) {
                    return setErrors({
                      username:
                        'The players name must have at least 3 characters'
                    })
                  }
                  if (email === '') {
                    return setErrors({ email: 'You must fill this field' })
                  }
                  if (password === '') {
                    return setErrors({ password: 'You must fill this field' })
                  }
                  if (confirmPassword === '') {
                    return setErrors({ password: 'You must fill this field' })
                  }
                  if (password !== confirmPassword) {
                    return setErrors({
                      password: 'Field do not match',
                      confirmPassword: 'Field do not match'
                    })
                  }
                  try {
                    const response = await registerMutation({
                      variables: {
                        login: username,
                        email,
                        password
                      }
                    })
                    if (response?.data?.register) {
                      const login: UsersPermissionsLoginPayload =
                        response.data.register
                      const token = login.jwt
                      const userData = login.user

                      dispatch({
                        type: 'SET_TOKEN',
                        payload: { token }
                      })

                      dispatch({
                        type: 'SET_USER',
                        payload: { user: userData }
                      })

                      localStorage.setItem('token', JSON.stringify(token))
                      localStorage.setItem('user', JSON.stringify(userData))
                      setUserId(userData.id)
                      try {
                        getFavorites({
                          variables: {
                            where: {
                              users_permissions_user: {
                                id: parseInt(userData.id)
                              }
                            },
                            sort: 'created_at:DESC'
                          }
                        })
                      } catch (error) {
                        console.log('favorite error: ', error)
                        setApolloErrors(
                          Object.assign(
                            [],
                            getApolloErrors(error.graphQLErrors)
                          )
                        )
                      }
                      controlFunction(false)
                    }
                  } catch (error) {
                    setApolloErrors(
                      Object.assign([], getApolloErrors(error.graphQLErrors))
                    )
                  }
                }}
              >
                <Form>
                  <S.FormContainer>
                    <InputField
                      color="black"
                      name="username"
                      placeholder="Username"
                      label="Username"
                    />
                    <InputField
                      color="black"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      label="E-mail"
                    />
                    <InputField
                      color="black"
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="Password"
                    />
                    <InputField
                      color="black"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      label="Confirm Password"
                    />
                    <S.LocalErrorsContainer>
                      {apolloErrors.length > 0 &&
                        apolloErrors.map((error, index) => {
                          return (
                            <S.LocalError key={index}>{error}</S.LocalError>
                          )
                        })}
                    </S.LocalErrorsContainer>
                    <S.ForgetPassword
                      onClick={() => setScreen('forget-password')}
                    >
                      Forgot your password ? Click here !
                    </S.ForgetPassword>
                    <Button
                      isLoading={registerLoading}
                      colorScheme="blue"
                      size="lg"
                      mb={4}
                      type="submit"
                    >
                      Create account
                    </Button>
                    <Button
                      onClick={() => setScreen('sign-in')}
                      colorScheme="green"
                      size="lg"
                    >
                      Already have an account ?
                    </Button>
                  </S.FormContainer>
                </Form>
              </Formik>
            </div>
          </S.SignContainer>
        ) : screen === 'forget-password' ? (
          <S.SignContainer>
            <div>
              <S.TopSection>
                <S.Logo>Fifa 21 Stats</S.Logo>
                <Heading color="dark">Forget Password</Heading>
              </S.TopSection>
              <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                  setApolloErrors([])
                  const { email } = values
                  if (email === '') {
                    return setErrors({ email: 'You must fill this field' })
                  }
                  try {
                    const response = await forgotPasswordMutation({
                      variables: {
                        email
                      }
                    })
                    if (response?.data?.forgotPassword?.ok) {
                      setScreen('reset-password')
                    }
                  } catch (error) {
                    setApolloErrors(
                      Object.assign([], getApolloErrors(error.graphQLErrors))
                    )
                  }
                }}
              >
                <Form>
                  <S.FormContainer>
                    <InputField
                      color="black"
                      name="email"
                      type="email"
                      placeholder="E-mail"
                      label="E-mail"
                    />
                    <S.LocalErrorsContainer>
                      {apolloErrors.length > 0 &&
                        apolloErrors.map((error, index) => {
                          return (
                            <S.LocalError key={index}>{error}</S.LocalError>
                          )
                        })}
                    </S.LocalErrorsContainer>
                    <Button
                      isLoading={forgotPasswordLoading}
                      colorScheme="blue"
                      size="lg"
                      mb={4}
                      type="submit"
                    >
                      Send a recovery code to my e-mail
                    </Button>
                    <Button
                      onClick={() => setScreen('sign-in')}
                      colorScheme="green"
                      size="lg"
                    >
                      Already have an account ?
                    </Button>
                  </S.FormContainer>
                </Form>
              </Formik>
            </div>
          </S.SignContainer>
        ) : screen === 'reset-password' ? (
          <S.SignContainer>
            <div>
              <S.TopSection>
                <S.Logo>Fifa 21 Stats</S.Logo>
                <Heading color="dark">Reset Password</Heading>
              </S.TopSection>
              <Formik
                initialValues={{
                  code: '',
                  password: '',
                  confirmPassword: ''
                }}
                onSubmit={async (values, { setErrors }) => {
                  setApolloErrors([])
                  const { code, password, confirmPassword } = values
                  if (code === '') {
                    return setErrors({ code: 'You must fill this field' })
                  }
                  if (password === '') {
                    return setErrors({ password: 'You must fill this field' })
                  }
                  if (confirmPassword === '') {
                    return setErrors({ password: 'You must fill this field' })
                  }
                  if (password !== confirmPassword) {
                    return setErrors({
                      password: 'Field do not match',
                      confirmPassword: 'Field do not match'
                    })
                  }
                  try {
                    const response = await resetPasswordMutation({
                      variables: {
                        code,
                        password,
                        passwordConfirmation: confirmPassword
                      }
                    })
                    if (response?.data?.resetPassword?.user) {
                      setScreen('sign-in')
                    }
                  } catch (error) {
                    setApolloErrors(
                      Object.assign([], getApolloErrors(error.graphQLErrors))
                    )
                  }
                }}
              >
                <Form>
                  <S.FormContainer>
                    <InputField
                      color="black"
                      name="code"
                      placeholder="Code"
                      label="Received Code"
                    />
                    <InputField
                      color="black"
                      name="password"
                      type="password"
                      placeholder="Password"
                      label="New Password"
                    />
                    <InputField
                      color="black"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm Password"
                      label="Confirm new Password"
                    />
                    <S.LocalErrorsContainer>
                      {apolloErrors.length > 0 &&
                        apolloErrors.map((error, index) => {
                          return (
                            <S.LocalError key={index}>{error}</S.LocalError>
                          )
                        })}
                    </S.LocalErrorsContainer>
                    <Button
                      isLoading={resetPasswordLoading}
                      colorScheme="blue"
                      size="lg"
                      mb={4}
                      type="submit"
                    >
                      Change Password
                    </Button>
                    <Button
                      onClick={() => setScreen('sign-in')}
                      colorScheme="green"
                      size="lg"
                    >
                      Already have an account ?
                    </Button>
                  </S.FormContainer>
                </Form>
              </Formik>
            </div>
          </S.SignContainer>
        ) : (
          <div></div>
        )}
      </S.Overlay>
    </S.Wrapper>
  )
}

export default SignFlow
