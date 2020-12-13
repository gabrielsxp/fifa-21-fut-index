import * as S from './styles'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Container } from 'components/Container'
import PlayerCard from 'components/PlayerCard'
import {
  DataChartProps,
  playerCardDataFormatted,
  playerRadarChartDataConstructor,
  comparePlayers
} from 'utils/playerMethods'
import { useSelector, useDispatch } from 'react-redux'
import { useCreateComparisonMutation } from 'generated/graphql'
import { AddUser as AddIcon } from '@styled-icons/entypo/AddUser'
import PlayerStat from 'components/PlayerStat'
import SearchCompare from 'components/SearchCompare'
import { Button } from '@chakra-ui/react'
import { useWindowSize } from 'utils/helpers'
import { Player as PlayerProps } from 'generated/graphql'
import { ReducersProps } from 'redux-local'

export type ComparePlayersProps = {
  visible?: boolean
  controlFunction: Dispatch<SetStateAction<boolean>>
}

type LocalAttributesProps = { label: string; value: number }

const ComparePlayers = ({
  visible = false,
  controlFunction
}: ComparePlayersProps) => {
  const dispatch = useDispatch()
  const players = useSelector(
    ({ playerReducer }: ReducersProps) => playerReducer.players
  )
  const similarPlayers = useSelector(
    ({ playerReducer }: ReducersProps) => playerReducer.similarPlayers
  )
  const [playersStats, setPlayersStats] = useState<LocalAttributesProps[][]>([])
  const [emptySlots, setEmptySlots] = useState<number>(0)
  const [isSearchPlayerOpened, setIsPlayerSearchOpened] = useState<boolean>(
    false
  )
  const [comparisonMatrix, setComparisonMatrix] = useState<number[][]>([])
  const [
    createComparisonMutation,
    { loading: creatingComparison }
  ] = useCreateComparisonMutation({})
  const [
    addedPlayerToComparison,
    setAddedPlayerToComparison
  ] = useState<boolean>()
  const windowSize = useWindowSize()
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)
  useEffect(() => {
    const b = document.querySelector('body')
    if (b) {
      if (visible) {
        b.style.overflow = 'hidden'
      } else {
        b.style.overflow = 'auto'
      }
    }
    setEmptySlots(5 - players.length ?? 0)
    const attributes: LocalAttributesProps[][] = []
    players.map((player) => {
      const data = playerRadarChartDataConstructor(
        player,
        player?.best_position === 'GK'
      )
      const values = data.reduce(
        (acc: LocalAttributesProps[], attr: DataChartProps, index: number) => {
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
    } else {
      setComparisonMatrix([])
    }

    if (addedPlayerToComparison) {
      setTimeout(() => {
        setAddedPlayerToComparison(false)
      }, 3000)
    }
  }, [visible, players.length, players, addedPlayerToComparison])

  const controlAddPlayerOnSlot = () => {
    setIsPlayerSearchOpened(true)
  }

  const addPlayersToComparison = async () => {
    await createComparisonMutation({
      variables: {
        players: players.map((p: PlayerProps) => p?.id || ''),
        user: user ? user?.id : ''
      }
    })
    setAddedPlayerToComparison(true)
  }

  const controlPlayerAdd = (player: PlayerProps) => {
    if (!players.find((p) => p?.player_id === player?.player_id)) {
      if (players.length >= 5) {
        return alert('Max of 5 players allowed')
      }
      if (player?.best_position === 'GK') {
        if (!players.every((p) => p?.best_position === 'GK')) {
          return alert(
            'You cannot add a goalkeeper on a list with line field players !'
          )
        }
      }
      if (player?.best_position !== 'GK') {
        if (players.some((p) => p?.best_position === 'GK')) {
          return alert(
            'You cannot add a line field player on a list with goalkeepers !'
          )
        }
      }
      const c = Object.assign([], players)
      c.push(player)
      console.log('players: ', c)
      dispatch({
        type: 'SET_PLAYERS',
        payload: {
          players: c
        }
      })
    } else {
      alert('This player is already on the compared players list')
    }
  }

  const removePlayerFromComparison = (index: number) => {
    console.log('index: ', index)
    dispatch({
      type: 'REMOVE_PLAYER',
      payload: {
        index
      }
    })
  }
  return (
    <S.Wrapper>
      <SearchCompare
        visible={isSearchPlayerOpened}
        searchVisibilityControl={setIsPlayerSearchOpened}
      />
      <S.Overlay visible={visible}>
        <S.IconWrapper>
          <S.IconWrapper onClick={() => controlFunction(false)}>
            <CloseIcon />
          </S.IconWrapper>
        </S.IconWrapper>
        <Container>
          <S.SimilarPlayersContainer>
            <S.SectionHeading>
              Similar Players
              {user && (
                <Button
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
            </S.SectionHeading>
            <S.SimilarPlayersGrid>
              {similarPlayers &&
                similarPlayers.map((player, index) => {
                  return (
                    <S.CardWrapper
                      onClick={() => controlPlayerAdd(player)}
                      key={index}
                    >
                      <PlayerCard
                        variant="small"
                        {...playerCardDataFormatted(player)}
                      />
                    </S.CardWrapper>
                  )
                })}
            </S.SimilarPlayersGrid>
          </S.SimilarPlayersContainer>
        </Container>
        <Container>
          <S.Grid>
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
                    <S.PlayerPosition>
                      Player Position: <b>{player?.best_position}</b>
                    </S.PlayerPosition>
                    <Button
                      onClick={() => removePlayerFromComparison(index)}
                      colorScheme="red"
                    >
                      Remove Player
                    </Button>
                    {playersStats &&
                      playersStats[index] &&
                      playersStats[index].map((attribute, _index) => {
                        return (
                          <PlayerStat
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
            {Array.from(new Array(emptySlots)).map((_, index_) => {
              return (
                <S.EmptyPlayerColumn
                  onClick={() => controlAddPlayerOnSlot()}
                  key={index_}
                >
                  <S.IconWrapper>
                    <AddIcon />
                  </S.IconWrapper>
                  Add a Player
                </S.EmptyPlayerColumn>
              )
            })}
          </S.Grid>
        </Container>
      </S.Overlay>
    </S.Wrapper>
  )
}

export default ComparePlayers
