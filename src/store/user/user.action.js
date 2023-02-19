import { createAction } from '../../utils/reducer/reducer.utils'
import { ACTION_TYPES } from './user.types'

export const setCurrentUser = (user) =>
  createAction(ACTION_TYPES.SET_CURRENT_USER, user)
