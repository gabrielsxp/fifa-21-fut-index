import * as S from './styles'
import PlayerCard from 'components/PlayerCard'
import { Player as PlayerProps } from 'generated/graphql'
import { playerCardDataFormatted } from 'utils/playerMethods'
import { useState, useEffect } from 'react'
import { Button } from '@chakra-ui/react'
import {
  sortPlayersByOverall,
  getPlayersByCardFrame,
  PlayerGroupObjectRarityProps,
  PlayersGroupObjectProps,
  getPlayersByPosition
} from 'utils/teamMethods'

export type TeamPlayerProps = {
  players: PlayerProps[]
}

const TeamPlayers = ({ players }: TeamPlayerProps) => {
  const [customPlayers, setCustomPlayers] = useState<PlayerProps[]>(players)
  const [
    playersByCardFrame,
    setPlayersByCardFrame
  ] = useState<PlayerGroupObjectRarityProps>({})
  const [
    playersByPosition,
    setPlayersByPosition
  ] = useState<PlayersGroupObjectProps>({})
  const [mode, setMode] = useState<string>('all')

  const formatNameSection = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }

  useEffect(() => {
    const p = Object.assign([], players)
    switch (mode) {
      case 'all':
        setCustomPlayers(sortPlayersByOverall(p))
        break
      case 'card_frame':
        setPlayersByCardFrame(getPlayersByCardFrame(p))
        break
      case 'position':
        setPlayersByPosition(getPlayersByPosition(p))
        break
      default:
        setCustomPlayers(sortPlayersByOverall(p))
        break
    }
  }, [mode, players])

  return (
    <S.Wrapper>
      <S.PreSortWrapper>
        <S.SortWrapper>
          <S.SortHeading>Sort players options:</S.SortHeading>
          <Button
            variant={mode === 'all' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setMode('all')}
          >
            Show All
          </Button>
          <Button
            variant={mode === 'card_frame' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setMode('card_frame')}
          >
            Card Frame
          </Button>
          <Button
            variant={mode === 'position' ? 'solid' : 'outline'}
            colorScheme="blue"
            onClick={() => setMode('position')}
          >
            Position
          </Button>
        </S.SortWrapper>
      </S.PreSortWrapper>
      {mode === 'all' && (
        <S.Grid>
          {customPlayers &&
            customPlayers.map((player: PlayerProps, index: number) => {
              return (
                <PlayerCard
                  key={index}
                  {...playerCardDataFormatted(player)}
                  variant="small"
                />
              )
            })}
        </S.Grid>
      )}
      <S.SectionGrid>
        {mode === 'card_frame' &&
          playersByCardFrame &&
          Object.keys(playersByCardFrame).map((section, index) => {
            return (
              <S.SectionContainer key={index}>
                <S.SectionNameContainer>
                  <S.SectionName>{formatNameSection(section)}</S.SectionName>
                  <S.SectionNumber>
                    {playersByCardFrame[section]?.total}{' '}
                    {playersByCardFrame[section]?.total === 1
                      ? 'player'
                      : 'players'}
                  </S.SectionNumber>
                </S.SectionNameContainer>
                <S.SectionColumnGrid>
                  {playersByCardFrame[section] &&
                    playersByCardFrame[section]?.players?.map(
                      (player, index) => {
                        return (
                          <PlayerCard
                            key={index}
                            {...playerCardDataFormatted(player)}
                            variant="small"
                          />
                        )
                      }
                    )}
                </S.SectionColumnGrid>
              </S.SectionContainer>
            )
          })}
      </S.SectionGrid>
      <S.SectionGrid>
        {mode === 'position' &&
          playersByPosition &&
          Object.keys(playersByPosition).map((section, index) => {
            return (
              <S.SectionContainer key={index}>
                <S.SectionNameContainer>
                  <S.SectionName>{formatNameSection(section)}</S.SectionName>
                  <S.SectionNumber>
                    {playersByPosition[section]?.total}{' '}
                    {playersByPosition[section]?.total === 1
                      ? 'player'
                      : 'players'}
                  </S.SectionNumber>
                </S.SectionNameContainer>
                <S.SectionColumnGrid>
                  {playersByPosition[section] &&
                    playersByPosition[section]?.players?.map(
                      (player, index) => {
                        return (
                          <PlayerCard
                            key={index}
                            {...playerCardDataFormatted(player)}
                            variant="small"
                          />
                        )
                      }
                    )}
                </S.SectionColumnGrid>
              </S.SectionContainer>
            )
          })}
      </S.SectionGrid>
    </S.Wrapper>
  )
}

export default TeamPlayers
