import * as S from './styles'
import { Container } from 'components/Container'
import PlayerStat from 'components/PlayerStat'
import PlayerStatusBar from 'components/PlayerStatusBar'
import { Foot as FootIcon } from '@styled-icons/foundation/Foot'
import { Star as StarIcon } from '@styled-icons/evaicons-solid/Star'
import { Check as CheckIcon } from '@styled-icons/boxicons-regular/Check'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { Player as PlayerProps } from 'generated/graphql'
import { PlayerStatProps } from 'components/PlayerStat'
import { attributeReadableName } from 'utils/helpers'
import { useEffect, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'

type DataChartProps = {
  subject?: string
  A?: number
  fullMark?: number
}

export type PlayerHeaderProps = {
  player: PlayerProps
}

type AccumulatorProps = PlayerStatProps & { field: string; category: string }

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
const weightedAverage = (values: number[], weights: number[]) => {
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

const getPlayerAttributesSubset = (player: PlayerProps, subset: string[]) => {
  return subset.reduce((acc: number[], subsetKey: string) => {
    const value: number = player[subsetKey as keyof typeof player]
    acc = acc.concat(value)

    return acc
  }, [])
}

const mapAttributeToCategory = (attr: string) => {
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
const playerChartDataConstructor = (player: PlayerProps) => {
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
const generatePlayerFields = (player: PlayerProps) => {
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

  // attributes divided by category
  const attributesOrganized = allAttrLabels.reduce(
    (
      acc: { [x: string]: AccumulatorProps[] },
      curr: {
        field: string
        values: string[]
      }
    ) => {
      const category = curr.field
      const attributesFiltered = attributes.filter((attr: AccumulatorProps) => {
        console.log(attr.category)
        return attr.category === category
      })
      acc[category] = Object.assign([], attributesFiltered)

      return acc
    },
    {}
  )

  return {
    topAttributes: attributes.slice(0, 6),
    attributes: attributesOrganized
  }
}

const PlayerHeader = ({ player }: PlayerHeaderProps) => {
  const [chartData, setChartData] = useState<DataChartProps[]>([])
  const [playerTopAttrs, setPlayerTopAttrs] = useState<AccumulatorProps[]>([])

  useEffect(() => {
    console.log('player: ', player)
    const chartData: DataChartProps[] = playerChartDataConstructor(player)
    const { topAttributes, attributes } = generatePlayerFields(player)

    console.log('Top Attributes: ', topAttributes)
    console.log('Player Attributes: ', attributes)
    console.log('chartData', chartData)
    setChartData(chartData)
    setPlayerTopAttrs(topAttributes)
  }, [])

  return (
    <S.Wrapper>
      <span></span>
      <Container>
        <S.Grid>
          <S.PlayerMainStatsContainer>
            <S.PlayerNameContainer>
              <S.PlayerJerseyNumber>10</S.PlayerJerseyNumber>
              <S.Image
                alt="L. Messi picture"
                src="https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133393/l_messi_158023_3fbc68cf1e.png"
              ></S.Image>
              <S.PlayerMainInfoWrapper>
                <S.Heading>L. Messi</S.Heading>
                <S.PlayerMainDataContainer>
                  <S.PlayerMainDataWrapper>
                    <S.MainDataImage
                      alt="Argentina"
                      src="https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133355/argentina_0cca0b308c.png"
                    />
                    <S.MainData>Argentina</S.MainData>
                  </S.PlayerMainDataWrapper>
                  <S.PlayerMainDataWrapper>
                    <S.MainDataImage
                      alt="FC. Barcelona"
                      src="https://res.cloudinary.com/dmna3ejn1/image/upload/v1607133350/fc_barcelona_6f885e5965.png"
                    />
                    <S.MainData>FC. Barcelona</S.MainData>
                  </S.PlayerMainDataWrapper>
                </S.PlayerMainDataContainer>
              </S.PlayerMainInfoWrapper>
            </S.PlayerNameContainer>
            <S.Line />
            <S.CommonStatsContainer>
              <S.CommomStat>
                Age: <span>33 years</span>
              </S.CommomStat>
              <S.CommomStat>
                Height: <span>5ft6</span>
              </S.CommomStat>
              <S.CommomStat>
                Weight: <span>140lb</span>
              </S.CommomStat>
              <S.CommomStat>
                4
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Weak Foot</span>
              </S.CommomStat>
              <S.CommomStat>
                5
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Skill Moves</span>
              </S.CommomStat>
              <S.CommomStat>
                5
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Int. Rep.</span>
              </S.CommomStat>
              <S.CommomStat>
                Work R.:<span>High/Low</span>
              </S.CommomStat>
              <S.CommomStat>
                Foot
                <S.IconWrapper>
                  <FootIcon />
                </S.IconWrapper>
                :<span>Left</span>
              </S.CommomStat>
              <S.CommomStat>
                Real Face:
                <span>
                  <S.IconWrapper>
                    <CheckIcon />
                  </S.IconWrapper>
                </span>
              </S.CommomStat>
            </S.CommonStatsContainer>
          </S.PlayerMainStatsContainer>
          <S.PlayerMainStatsContainer>
            <S.PlayerStatsContainer>
              <S.PlayerStatsContainer>
                <PlayerStat label="Overall" stat={93} />
                <PlayerStat label="Potential" stat={93} />
              </S.PlayerStatsContainer>
            </S.PlayerStatsContainer>
            <S.SectionHeading>Player main stats</S.SectionHeading>
            <S.TopStatsContainer>
              {playerTopAttrs &&
                playerTopAttrs.map((field, index) => {
                  return (
                    <PlayerStatusBar
                      key={index}
                      label={field.label}
                      stat={field.stat}
                    />
                  )
                })}
            </S.TopStatsContainer>
          </S.PlayerMainStatsContainer>
          <S.PlayerMainDataContainer>
            <S.ChartWrapper>
              <ResponsiveContainer>
                <RadarChart data={chartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Radar
                    legendType="diamond"
                    name="Mark"
                    dataKey="A"
                    stroke="#c2ff1f"
                    fill="#c2ff1f"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </S.ChartWrapper>
          </S.PlayerMainDataContainer>
        </S.Grid>
      </Container>
    </S.Wrapper>
  )
}

export default PlayerHeader
