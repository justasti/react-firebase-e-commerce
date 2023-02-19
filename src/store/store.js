import { compose, createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'

import { rootReducer } from './root-reducer'

//root reducer

const middlewares = [logger]
const composedEnchancers = compose(applyMiddleware(...middlewares))

export const store = createStore(rootReducer, undefined, composedEnchancers)