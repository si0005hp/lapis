import { combineReducers } from 'redux'
import userReducer, { State as UserState } from './user'

export interface RootState {
  user: UserState
}

export default () =>
  combineReducers({
    user: userReducer
  })
