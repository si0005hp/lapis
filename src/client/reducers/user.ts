import { Actions } from '../actions/user'
import { Reducer } from 'redux'
import { User } from '../../common/types/index'
import { ActionTypes } from '../actions/action-types'

export interface State {
  user: User | null
}

const initialState: State = {
  user: null
}

const userReducer: Reducer<State, Actions> = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_USER_START: {
      return state
    }
    case ActionTypes.CREATE_USER_SUCCESS: {
      return { ...state, user: action.payload }
    }
    case ActionTypes.CREATE_USER_ERROR: {
      // TODO
      return state
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action
      return state
    }
  }
}

export default userReducer
