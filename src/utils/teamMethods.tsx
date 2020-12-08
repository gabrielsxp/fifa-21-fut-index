import { Player as PlayerProps } from 'generated/graphql'
import { getCardRarity } from 'utils/playerMethods'

export type PlayerGroupAccumulatorProps = {
  name: string
  players: PlayerProps[]
  averageOverall: number
  total: number
}

export type PlayersGroupObjectProps = {
  [x: string]: Omit<PlayerGroupAccumulatorProps, 'name'>
}

export type PlayerGroupObjectRarityProps = {
  [x: string]: {
    players: PlayerProps[]
    total: number
  }
}

/**
 * Given a players array, returns all players grouped by position
 * @param players
 */
export const getPlayersGroupedByPosition = (players: PlayerProps[]) => {
  const allPositions = players.map((player) => player?.best_position)
  const positions = new Set(allPositions)
  return Array.from(positions).reduce(
    (
      acc: PlayerGroupAccumulatorProps[],
      position: string | undefined | null
    ) => {
      const obj: PlayerGroupAccumulatorProps = {
        name: '',
        averageOverall: 0,
        players: [],
        total: 0
      }
      const currentPositionPlayers = players
        .filter((player) => player?.best_position === position)
        .sort((a, b) => (b?.overall ?? 0) - (a?.overall ?? 0))
      const totalPositionOverall = currentPositionPlayers.reduce(
        (acc, player) => {
          acc += player?.overall ?? 0
          return acc
        },
        0
      )
      obj.name = position ?? ''
      obj.players = currentPositionPlayers
      obj.averageOverall =
        currentPositionPlayers.length > 0
          ? Math.ceil(totalPositionOverall / currentPositionPlayers.length)
          : 0
      obj.total = currentPositionPlayers.length ?? 0

      acc = acc.concat(obj)

      return acc
    },
    []
  )
}

/**
 * Get the response from ${getPlayersGroupedByPosition} and returns and object
 * formatted to display the data on Players section o TeamPlayers component
 * @param players
 */
export const getPlayersByPosition = (players: PlayerProps[]) => {
  const playersGrouped = getPlayersGroupedByPosition(players)
  return playersGrouped.reduce(
    (acc: PlayersGroupObjectProps, position: PlayerGroupAccumulatorProps) => {
      acc[position?.name ?? ''] = {
        players: position?.players.sort(
          (a, b) => (b?.overall ?? 0) - (a?.overall ?? 0)
        ),
        averageOverall: position?.averageOverall,
        total: position?.total
      }
      return acc
    },
    {}
  )
}

/**
 *
 * @param players Get the rarity of each player and group all after
 * find out which rarities exists on each group of player
 */
export const getPlayersByCardFrame = (players: PlayerProps[]) => {
  const rarities = new Set(
    players.map((player) => getCardRarity(player?.overall ?? 0, '-'))
  )
  return Array.from(rarities).reduce(
    (acc: PlayerGroupObjectRarityProps, rarity: string) => {
      const playersWithThisRarity = players.filter(
        (player) => getCardRarity(player?.overall ?? 0, '-') === rarity
      )
      acc[rarity] = {
        players: playersWithThisRarity,
        total: playersWithThisRarity.length
      }
      return acc
    },
    {}
  )
}

/**
 * Given an array of players, returns this players sorted by overall
 * @param players
 */
export const sortPlayersByOverall = (players: PlayerProps[]) => {
  return players.sort((a, b) => (b?.overall ?? 0) - (a?.overall ?? 0))
}
