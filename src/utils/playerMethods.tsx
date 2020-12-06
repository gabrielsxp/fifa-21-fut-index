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
export const playerRadarChartDataConstructor = (player: PlayerProps) => {
  //categories weights
  const paceAttrWeights = [1, 1.5]
  const shootingAttrWeights = [3, 4, 2, 3, 1, 1]
  const passingAttrWeights = [1, 2, 1, 3, 3, 1]
  const dribblingAttrWeights = [2, 1, 1, 2, 2, 2]
  const defendingAttrWeights = [2, 1, 1.5, 2, 2]
  const physicAttrWeights = [2, 3, 2, 2]

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

  return Object.keys(labels).reduce((acc: DataChartProps[], key: string) => {
    let obj: DataChartProps = {}
    const value = weightedAverage(
      labels[key as keyof typeof labels].values,
      labels[key as keyof typeof labels].weights
    )
    obj = {
      subject: `${key} (${value})`,
      A: value,
      fullMark: 99
    }
    acc = acc.concat(obj)
    return acc
  }, [])
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
    ...physicAttr
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
  const weightedValues = playerRadarChartDataConstructor(player)
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

  return {
    topAttributes: attributes.slice(0, 6),
    attributes: attributesOrganized
  }
}

/**
 * Helper function to return a card rarirty based on players overall
 */
const getCardRarity = (overall: number) => {
  if (overall < 65) {
    return 'bronze'
  } else if (overall < 75) {
    return 'silver'
  } else {
    return 'gold'
  }
}

/**
 * Helper function to reduce a player name to fit the card
 * @param name
 */
const formatReducePlayerName = (name: string) => {
  if (name.includes('.')) {
    return name
  } else {
    const names = name.split(' ')
    if (name === 'Cristiano Ronaldo') {
      return names[1]
    } else if (name.match('Neymar')) {
      return names[0]
    } else {
      return names[1]
    }
  }
}

/**
 *
 * @param player Given a player object, returns all players card attributes formatted
 */
export const playerCardDataFormatted = (player: PlayerProps) => {
  const weightedValues = playerRadarChartDataConstructor(player)
  return {
    quality: getCardRarity(player?.overall ?? 0),
    playerImage: player?.photo?.url,
    playerOverall: player?.overall ?? 0,
    playerPosition: player?.position ?? '',
    playerName: formatReducePlayerName(player?.name ?? ''),
    playerNationImage: player?.nation?.image?.url,
    playerTeamImage: player?.team?.image?.url,
    playerPace: weightedValues[0].A,
    playerShooting: weightedValues[1].A,
    playerPassing: weightedValues[2].A,
    playerDribbling: weightedValues[3].A,
    playerDefending: weightedValues[4].A,
    playerPhysicality: weightedValues[5].A
  }
}
