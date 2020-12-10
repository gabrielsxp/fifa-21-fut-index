import {
  SET_PLAYERS,
  REMOVE_PLAYER,
  SET_SIMILAR_PLAYERS,
  SET_TOP_PLAYERS
} from 'redux-local/actions'
import { Player as PlayerProps } from 'generated/graphql'

type PayloadProps = {
  players: PlayerProps[]
  index?: number
}

export type ActionProps = {
  type: string
  payload: PayloadProps
}

export const setPlayers = (players: PlayerProps[]) => ({
  payload: players,
  type: SET_PLAYERS
})

export const setSimilarPlayers = (players: PlayerProps[]) => ({
  payload: players,
  type: SET_SIMILAR_PLAYERS
})

export const removePlayer = (index: number) => ({
  payload: { index },
  type: REMOVE_PLAYER
})

export const setTopPlayers = (players: PlayerProps[]) => ({
  payload: players,
  type: SET_TOP_PLAYERS
})
