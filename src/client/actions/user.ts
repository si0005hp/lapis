import { User } from '../../common/types/index'
import { ActionTypes } from './action-types'

export const setLoginUser = (payload: User) => ({
  type: ActionTypes.SET_LOGIN_USER,
  payload
})

export const setLoginError = (payload: string) => ({
  type: ActionTypes.SET_LOGIN_ERROR,
  payload
})

export type Actions = ReturnType<typeof setLoginUser> | ReturnType<typeof setLoginError>
