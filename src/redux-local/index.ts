import { createStore } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import reducer from 'redux-local/reducers/players'

const buildStore = () => {
  const c = createStore
  const store = c(reducer, composeWithDevTools())

  return store
}

export const storeWrapper = createWrapper(buildStore, { debug: false })
