import { SET_USER, SET_TOKEN } from 'redux-local/actions'
import { UsersPermissionsMe as UserProps } from 'generated/graphql'

type PayloadProps = {
  user: UserProps
  token: string
}

export type ActionProps = {
  type: string
  payload: PayloadProps
}

export const setUser = (user: UserProps) => ({
  payload: user,
  type: SET_USER
})

export const setToken = (token: string | null) => ({
  payload: token,
  type: SET_TOKEN
})
