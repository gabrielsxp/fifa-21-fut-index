import { HYDRATE } from 'next-redux-wrapper'
import { Player as PlayerProps } from 'generated/graphql'

import {
  SET_PLAYERS,
  REMOVE_PLAYER,
  SET_SIMILAR_PLAYERS,
  SET_TOP_PLAYERS
} from 'redux-local/actions'

export type InitialStateProps = {
  players: PlayerProps[]
  similarPlayers: PlayerProps[]
  topPlayers: PlayerProps[]
}

const initialState: InitialStateProps = {
  players: [],
  similarPlayers: [],
  topPlayers: []
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload.players
    case SET_PLAYERS:
      state.players = [...action.payload.players]
      return state
    case SET_TOP_PLAYERS:
      state.topPlayers = [...action.payload.players]
      return state
    case SET_SIMILAR_PLAYERS:
      state.similarPlayers = [...action.payload.players]
      return state
    case REMOVE_PLAYER:
      // eslint-disable-next-line no-case-declarations
      const p = Object.assign([], state.players)
      if (typeof action.payload.index !== 'undefined') {
        p.splice(action.payload.index, 1)
        state.players = p
        return state
      }
      return state
    default:
      return state
  }
}

export default reducer
