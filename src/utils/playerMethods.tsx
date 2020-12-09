import { PlayerStatProps } from 'components/PlayerStat'
import { attributeReadableName } from './helpers'
import { Player as PlayerProps } from 'generated/graphql'

export type AccumulatorProps = PlayerStatProps & {
  field: string
  category: string
}

export type ExpandedAccumulatorProps = {
  attrs: AccumulatorProps[]
  weighted?: number
}

export type ChartRawData = {
  values: number[]
  weights: number[]
}

export type DataChartProps = {
  subject?: string
  A?: number
  fullMark?: number
}

// categories fields
const paceAttr = ['acceleration', 'sprint_speed']
const shootingAttr = [
  'positioning',
  'finishing',
  'shot_power',
  'long_shots',
  'volleys',
  'penalties'
]
const passingAttrs = [
  'vision',
  'crossing',
  'f_k_accuracy',
  'short_passing',
  'long_passing',
  'curve'
]
const dribblingAttr = [
  'agility',
  'balance',
  'reactions',
  'ball_control',
  'dribbling',
  'composure'
]
const defendingAttr = [
  'interceptions',
  'heading_accuracy',
  'defensive_awareness',
  'standing_tackle',
  'sliding_tackle'
]
const physicAttr = ['jumping', 'stamina', 'strength', 'aggression']
const gkDivingAttr = ['g_k_diving']
const gkHandlingAttr = ['g_k_handling']
const gkKickingAttr = ['g_k_kicking']
const gkReflexesAttr = ['g_k_reflexes']
const gkSpeedAttr = ['acceleration', 'sprint_speed']
const gkPositioningAttr = ['g_k_positioning']
/*
  Receive a set of attribute section values and make a weighted average over it
*/
export const weightedAverage = (values: number[], weights: number[]) => {
  const weightsSum = weights.reduce((acc, curr) => {
    acc += curr
    return acc
  }, 0)

  const summedValues = values.reduce((acc, curr, index) => {
    const x = curr * weights[index]
    acc += x
    return acc
  }, 0)

  return Math.ceil(summedValues / weightsSum)
}

/**
 * Helper function to get certain values from player's object
 * @param number[] array of values
 */

export const getPlayerAttributesSubset = (
  player: PlayerProps,
  subset: string[]
) => {
  return subset.reduce((acc: number[], subsetKey: string) => {
    const value: number = player[subsetKey as keyof typeof player]
    acc = acc.concat(value)

    return acc
  }, [])
}

export const mapAttributeToCategory = (attr: string) => {
  const labels = {
    Pace: {
      values: paceAttr
    },
    Shooting: {
      values: shootingAttr
    },
    Passing: {
      values: passingAttrs
    },
    Dribbling: {
      values: dribblingAttr
    },
    Defending: {
      values: defendingAttr
    },
    Physicality: {
      values: physicAttr
    }
  }
  const categories = Object.keys(labels).map((category) => {
    const exists = labels[category as keyof typeof labels].values.find(
      (attribute: string) => attribute === attr
    )
    if (exists) {
      return category
    }
  })
  return categories.filter((c) => typeof c !== 'undefined')[0]
}

/**
 * Responsable function to build a specific Radar dataset
 * @param player
 * @return dataset DataChartProps[]
 */
export const playerRadarChartDataConstructor = (
  player: PlayerProps,
  isGK: boolean
) => {
  //categories weights
  const paceAttrWeights = [1, 1.5]
  const shootingAttrWeights = [3, 4, 2, 3, 1, 1]
  const passingAttrWeights = [1, 2, 1, 3, 3, 1]
  const dribblingAttrWeights = [2, 1, 1, 2, 2, 2]
  const defendingAttrWeights = [2, 1, 1.5, 2, 2]
  const physicAttrWeights = [2, 3, 2, 2]
  const gkSpeedAttrWeights = [1, 1]

  const labels = {
    Pace: {
      values: getPlayerAttributesSubset(player, paceAttr),
      weights: paceAttrWeights
    },
    Shooting: {
      values: getPlayerAttributesSubset(player, shootingAttr),
      weights: shootingAttrWeights
    },
    Passing: {
      values: getPlayerAttributesSubset(player, passingAttrs),
      weights: passingAttrWeights
    },
    Dribbling: {
      values: getPlayerAttributesSubset(player, dribblingAttr),
      weights: dribblingAttrWeights
    },
    Defending: {
      values: getPlayerAttributesSubset(player, defendingAttr),
      weights: defendingAttrWeights
    },
    Physicality: {
      values: getPlayerAttributesSubset(player, physicAttr),
      weights: physicAttrWeights
    }
  }

  const gkLabels = {
    Diving: {
      values: getPlayerAttributesSubset(player, gkDivingAttr),
      weights: [1]
    },
    Handling: {
      values: getPlayerAttributesSubset(player, gkHandlingAttr),
      weights: [1]
    },
    Kicking: {
      values: getPlayerAttributesSubset(player, gkKickingAttr),
      weights: [1]
    },
    Reflexes: {
      values: getPlayerAttributesSubset(player, gkReflexesAttr),
      weights: [1]
    },
    Speed: {
      values: getPlayerAttributesSubset(player, gkSpeedAttr),
      weights: gkSpeedAttrWeights
    },
    Positioning: {
      values: getPlayerAttributesSubset(player, gkPositioningAttr),
      weights: [1]
    }
  }

  return Object.keys(isGK ? gkLabels : labels).reduce(
    (acc: DataChartProps[], key: string) => {
      let obj: DataChartProps = {}
      const l: { [x: string]: ChartRawData } = isGK ? gkLabels : labels
      const value = weightedAverage(
        l[key as keyof typeof l].values,
        l[key as keyof typeof l].weights
      )
      obj = {
        subject: `${key} (${value})`,
        A: value,
        fullMark: 99
      }
      acc = acc.concat(obj)
      return acc
    },
    []
  )
}

/**
 * Function to generate a player attributes data with readable name and
 * read to inject on bar and stat components and sorted by categories
 * @param player
 * @return { label: string, stat: number }[]
 */
export const generatePlayerFields = (player: PlayerProps) => {
  const allAttr = [
    ...paceAttr,
    ...shootingAttr,
    ...passingAttrs,
    ...dribblingAttr,
    ...defendingAttr,
    ...physicAttr,
    ...gkDivingAttr,
    ...gkHandlingAttr,
    ...gkKickingAttr,
    ...gkReflexesAttr,
    ...gkSpeedAttr,
    ...gkPositioningAttr
  ]

  const allAttrLabels = [
    { field: 'Pace', values: paceAttr },
    { field: 'Shooting', values: shootingAttr },
    { field: 'Passing', values: passingAttrs },
    { field: 'Dribbling', values: dribblingAttr },
    { field: 'Defending', values: defendingAttr },
    { field: 'Physicality', values: physicAttr }
  ]

  // attributes sorted by stat value
  const attributes: AccumulatorProps[] = allAttr
    .reduce((acc: AccumulatorProps[], curr: string) => {
      const key = curr as keyof typeof player
      let obj: AccumulatorProps = { stat: 0, field: '', category: '' }
      obj = {
        label: attributeReadableName(key),
        field: key,
        category: mapAttributeToCategory(key) ?? '',
        stat: player[key]
      }
      acc = acc.concat(obj)

      return acc
    }, [])
    .sort((a, b) => b.stat - a.stat)
  const weightedValues = playerRadarChartDataConstructor(player, false)
  // attributes divided by category
  const attributesOrganized = allAttrLabels.reduce(
    (
      acc: { [x: string]: ExpandedAccumulatorProps },
      curr: {
        field: string
        values: string[]
      },
      index: number
    ) => {
      const category = curr.field
      const attributesFiltered = attributes.filter((attr: AccumulatorProps) => {
        return attr.category === category
      })
      acc[category] = Object.assign([], {
        attrs: attributesFiltered,
        weighted: weightedValues[index].A
      })

      return acc
    },
    {}
  )

  const gkAttributes: { [x: string]: ExpandedAccumulatorProps } = {
    Diving: {
      attrs: [
        {
          label: 'Diving',
          field: 'g_k_diving',
          stat: player?.g_k_diving ?? 0,
          category: 'Diving'
        }
      ],
      weighted: player?.g_k_diving ?? 0
    },
    Handling: {
      attrs: [
        {
          label: 'Handling',
          field: 'g_k_handling',
          stat: player?.g_k_handling ?? 0,
          category: 'Handling'
        }
      ],
      weighted: player?.g_k_handling ?? 0
    },
    Kicking: {
      attrs: [
        {
          label: 'Kicking',
          field: 'g_k_kicking',
          stat: player?.g_k_kicking ?? 0,
          category: 'Kicking'
        }
      ],
      weighted: player?.g_k_kicking ?? 0
    },
    Reflexes: {
      attrs: [
        {
          label: 'Reflexes',
          field: 'g_k_reflexes',
          stat: player?.g_k_reflexes ?? 0,
          category: 'Reflexes'
        }
      ],
      weighted: player?.g_k_reflexes ?? 0
    },
    Speed: {
      attrs: [
        {
          label: 'Acceleration',
          field: 'Acceleration',
          stat: player?.acceleration ?? 0,
          category: 'Acceleration'
        },
        {
          label: 'Speed',
          field: 'sprint_speed',
          stat: player?.sprint_speed ?? 0,
          category: 'Speed'
        }
      ],
      weighted: weightedAverage(
        [player?.acceleration ?? 0, player?.sprint_speed ?? 0],
        [1, 1]
      )
    },
    Positioning: {
      attrs: [
        {
          label: 'Positioning',
          field: 'g_k_positioning',
          stat: player?.g_k_positioning ?? 0,
          category: 'Positioning'
        }
      ],
      weighted: player?.g_k_positioning ?? 0
    }
  }

  return {
    topAttributes: attributes.slice(0, 6),
    gkAttributes: gkAttributes,
    attributes: attributesOrganized
  }
}

/**
 * Helper function to return a card rarirty based on players overall
 */
export const getCardRarity = (overall: number, work_rate: string) => {
  if (overall < 65) {
    return 'bronze'
  } else if (overall < 75) {
    return 'silver'
  } else {
    if (work_rate === 'N/A/ N/A') {
      return 'legend'
    } else {
      return 'gold'
    }
  }
}

/**
 * Helper function to reduce a player name to fit the card
 * @param name
 */
const formatReducePlayerName = (name: string) => {
  if (name.includes('.')) {
    if (name === 'Vinícius Jr.') {
      return 'Vinícius Jr.'
    }
    return name.split('.')[1]
  } else if (name.includes(' ')) {
    const names = name.split(' ')
    console.log(names)
    if (name === 'Cristiano Ronaldo') {
      return names[1]
    } else if (name.match('Neymar')) {
      return names[0]
    } else {
      return names[0][0] + `. ${names[1]}`
    }
  } else {
    console.log('name: ', name)
    return name
  }
}

/**
 *
 * @param player Given a player object, returns all players card attributes formatted
 */
export const playerCardDataFormatted = (player: PlayerProps) => {
  const weightedValues = playerRadarChartDataConstructor(
    player,
    player?.best_position === 'GK'
  )
  return {
    playerId: player?.player_id ?? 0,
    quality: getCardRarity(player?.overall ?? 0, player?.work_rate ?? ''),
    playerImage: player?.photo?.url,
    playerOverall: player?.overall ?? 0,
    playerPosition: player?.best_position ?? '',
    playerName: formatReducePlayerName(player?.name ?? ''),
    playerNationImage: player?.nation?.image?.url,
    playerTeamImage: player?.team?.image?.url,
    playerPace: weightedValues[0].A,
    playerShooting: weightedValues[1].A,
    playerPassing: weightedValues[2].A,
    playerDribbling: weightedValues[3].A,
    playerDefending: weightedValues[4].A,
    playerPhysicality: weightedValues[5].A,
    isGK: player?.best_position === 'GK'
  }
}

type LocalComparisonObject = {
  values: number[]
  identifier: number
}

/**
 * Given a list of players, return a matrix of 0 or 1s indicating
 * if the badge is highligted or not
 * @param players
 */
export const comparePlayers = (players: PlayerProps[]) => {
  const attributes = players.reduce(
    (acc: LocalComparisonObject[], player: PlayerProps, index: number) => {
      const weightedValues = playerRadarChartDataConstructor(
        player,
        player?.best_position === 'GK'
      )
      const comparedObject: LocalComparisonObject = {
        identifier: index,
        values: weightedValues.map((value) => value.A ?? 0)
      }
      acc = acc.concat(comparedObject)

      return acc
    },
    []
  )
  console.log(attributes)
  const matrix = []
  for (let i = 0; i < 6; i++) {
    const a_ = { id: attributes[0].identifier, value: attributes[0].values[i] },
      b_ = { id: attributes[1].identifier, value: attributes[1].values[i] },
      c_ = { id: attributes[2].identifier, value: attributes[2].values[i] }
    const values = [a_, b_, c_].sort((a, b) => b.value - a.value)
    matrix.push(
      values
        .map((value, index) => ({
          id: value.id,
          matrixValue: index === 0 ? 1 : 0
        }))
        .sort((a, b) => a.id - b.id)
        .map((matrixColumn) => matrixColumn.matrixValue)
    )
  }
  console.log(matrix)
}
