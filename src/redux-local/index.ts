import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { combineReducers } from 'redux'
import playerReducer, { InitialStateProps } from 'redux-local/reducers/players'
import { InitialStateProps as UserInitialStateProps } from 'redux-local/reducers/user'
import userReducer from 'redux-local/reducers/user'

export type ReducersProps = {
  playerReducer: InitialStateProps
  userReducer: UserInitialStateProps
}

const reducer = combineReducers({
  playerReducer,
  userReducer
})

const buildStore = () => {
  const c = createStore
  const store = c(reducer, composeWithDevTools())

  return store
}

export const storeWrapper = createWrapper(buildStore, { debug: false })
