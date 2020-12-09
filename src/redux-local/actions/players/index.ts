import { SET_PLAYERS } from 'redux-local/actions'
import { Player as PlayerProps } from 'generated/graphql'

type PayloadProps = {
  players: PlayerProps[]
}

export type ActionProps = {
  type: string
  payload: PayloadProps
}

export const setPlayers = (players: PlayerProps[]) => ({
  payload: players,
  type: SET_PLAYERS
})
