import { HYDRATE } from 'next-redux-wrapper'
import { Player as PlayerProps } from 'generated/graphql'
import { ActionProps } from 'redux-local/actions/players'
import { SET_PLAYERS } from 'redux-local/actions'

export type InitialStateProps = {
  players: PlayerProps[]
}

const initialState: InitialStateProps = {
  players: []
}

const reducer = (state = initialState, action: ActionProps) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.players
    case SET_PLAYERS:
      console.log('state: ', state)
      state.players = [...state.players, ...action.payload.players]
      return state
    default:
      return state
  }
}

export default reducer
