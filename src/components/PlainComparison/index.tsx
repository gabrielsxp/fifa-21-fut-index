import * as S from './styles'
import Heading from 'components/Heading'
import {
  Player as PlayerProps,
  useCreateComparisonMutation
} from 'generated/graphql'
// import SectionBackground from 'components/SectionBackground'
import { Container } from 'components/Container'
import React, { useState, useEffect } from 'react'
import {
  playerRadarChartDataConstructor,
  DataChartProps,
  comparePlayers,
  playerCardDataFormatted
} from 'utils/playerMethods'
import PlayerCard from 'components/PlayerCard'
import PlayerStat from 'components/PlayerStat'
import { useWindowSize } from 'utils/helpers'
import Skeletron from 'components/Skeletron'
import { Button } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ReducersProps } from 'redux-local'

export type PlainComparisonProps = {
  title?: string
  subtitle?: string
  players: PlayerProps[]
  scheme?: 'dark' | 'light'
  loading?: boolean
  allowAddToComparisons?: boolean
}

type LocalAttributesProps = { label: string; value: number }

const PlainComparison = ({
  title = 'Random comparison',
  subtitle = 'Players with the same position compared side-by-side',
  players,
  scheme = 'light',
  loading = false,
  allowAddToComparisons = false
}: PlainComparisonProps) => {
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)
  const [playersStats, setPlayersStats] = useState<LocalAttributesProps[][]>([])
  const [comparisonMatrix, setComparisonMatrix] = useState<number[][]>([])
  const windowSize = useWindowSize()
  const [
    createComparisonMutation,
    { loading: creatingComparison }
  ] = useCreateComparisonMutation({})
  const [
    addedPlayerToComparison,
    setAddedPlayerToComparison
  ] = useState<boolean>()
  useEffect(() => {
    if (typeof players !== 'undefined') {
      const attributes: LocalAttributesProps[][] = []
      players.map((player) => {
        const data = playerRadarChartDataConstructor(
          player,
          player?.best_position === 'GK'
        )
        const values = data.reduce(
          (
            acc: LocalAttributesProps[],
            attr: DataChartProps,
            index: number
          ) => {
            const isGK = player?.best_position === 'GK'
            const labels = ['PAC', 'SHO', 'PAS', 'DRI', 'DEF', 'PHY']
            const gkLabels = ['DIV', 'HAN', 'KIC', 'REF', 'SPE', 'POS']

            const attribute = {
              label: isGK ? gkLabels[index] : labels[index],
              value: attr?.A ?? 0
            }

            acc = acc.concat(attribute)
            return acc
          },
          []
        )
        attributes.push(values)
      })
      setPlayersStats(Object.assign([], attributes))
      if (players.length > 1) {
        const comparison = comparePlayers(players)
        setComparisonMatrix(comparison)
      }
    }
    if (addedPlayerToComparison) {
      setTimeout(() => {
        setAddedPlayerToComparison(false)
      }, 3000)
    }
  }, [addedPlayerToComparison, players])

  const addPlayersToComparison = async () => {
    await createComparisonMutation({
      variables: {
        players: players.map((p: PlayerProps) => p?.id || ''),
        user: user ? user?.id : ''
      }
    })
    setAddedPlayerToComparison(true)
  }

  return loading && !players ? (
    <S.Wrapper>
      <Container>
        <S.ContentWrapper>
          <S.TopSection>
            {!!title && <Heading color={scheme}>{title}</Heading>}
            {!!subtitle && (
              <Heading color={scheme} size="small">
                {subtitle}
              </Heading>
            )}
          </S.TopSection>
          <S.AttributeComparisonGrid>
            {Array.from(new Array(5)).map((_, index) => {
              return <Skeletron height="40rem" key={index} />
            })}
          </S.AttributeComparisonGrid>
        </S.ContentWrapper>
      </Container>
    </S.Wrapper>
  ) : (
    <S.Wrapper>
      <Container>
        <S.ContentWrapper>
          <S.TopSection>
            {!!title && <Heading color={scheme}>{title}</Heading>}
            {user && allowAddToComparisons && (
              <Button
                my={4}
                isLoading={creatingComparison}
                onClick={() => addPlayersToComparison()}
                colorScheme={addedPlayerToComparison ? 'green' : 'pink'}
                disabled={addedPlayerToComparison}
              >
                {addedPlayerToComparison
                  ? 'Comparison Created !'
                  : 'Add to my comparisons'}
              </Button>
            )}
            {!!subtitle && (
              <Heading color={scheme} size="small">
                {subtitle}
              </Heading>
            )}
          </S.TopSection>
          <S.AttributeComparisonGrid>
            {players &&
              players.map((player, index) => {
                return (
                  <S.PlayerContainer key={index}>
                    <PlayerCard
                      variant={
                        windowSize &&
                        windowSize?.width &&
                        windowSize?.width < 799
                          ? 'small'
                          : 'normal'
                      }
                      {...playerCardDataFormatted(player)}
                    />
                    <S.PlayerPosition scheme={scheme}>
                      Player Position: <b>{player?.best_position}</b>
                    </S.PlayerPosition>
                    {playersStats &&
                      playersStats[index] &&
                      playersStats[index].map((attribute, _index) => {
                        return (
                          <PlayerStat
                            scheme={scheme}
                            key={_index}
                            label={attribute.label}
                            stat={attribute.value}
                            transparency={
                              comparisonMatrix.length > 1
                                ? comparisonMatrix[_index][index]
                                : 1
                            }
                          />
                        )
                      })}
                  </S.PlayerContainer>
                )
              })}
          </S.AttributeComparisonGrid>
        </S.ContentWrapper>
      </Container>
    </S.Wrapper>
  )
}

export default PlainComparison
