import { Actions } from '../actions/user'
import { Reducer } from 'redux'
import { User } from '../../common/types/index'
import { ActionTypes } from '../actions/action-types'

export interface State {
  user: User | null
  loginError: string | null
}

const initialState: State = {
  user: null,
  loginError: null
}

const userReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOGIN_USER: {
      return { ...state, user: action.payload }
    }
    case ActionTypes.SET_LOGIN_ERROR: {
      return { ...state, loginError: action.payload }
    }
    default: {
      return state
    }
  }
}

export default userReducer
