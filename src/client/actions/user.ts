import { User } from '../../common/types/index'
import { Dispatch } from 'redux'
import { ActionTypes } from './action-types'
import { apiPost } from '../api/api'

const createUserStart = (payload: string) => ({
  type: ActionTypes.CREATE_USER_START,
  payload
})
const createUserSuccess = (payload: User) => ({
  type: ActionTypes.CREATE_USER_SUCCESS,
  payload
})
const createUserError = (payload: { error: string }) => ({
  type: ActionTypes.CREATE_USER_ERROR,
  payload
})

export const createUser = (sub: string) => async (dispatch: Dispatch) => {
  dispatch(createUserStart(sub))
  let res
  try {
    res = await apiPost('/api/users', { user: { sub } })
  } catch (e) {
    dispatch(createUserError(e.response.data))
    throw e
  }
  dispatch(createUserSuccess(res.data.user))
}

export type Actions =
  | ReturnType<typeof createUserStart>
  | ReturnType<typeof createUserSuccess>
  | ReturnType<typeof createUserError>
