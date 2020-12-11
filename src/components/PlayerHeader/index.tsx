import * as S from './styles'
import { Container } from 'components/Container'
import PlayerStat from 'components/PlayerStat'
import PlayerStatusBar from 'components/PlayerStatusBar'
import { Foot as FootIcon } from '@styled-icons/foundation/Foot'
import { Star as StarIcon } from '@styled-icons/evaicons-solid/Star'
import { Check as CheckIcon } from '@styled-icons/boxicons-regular/Check'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { Player as PlayerProps } from 'generated/graphql'
import { Button } from '@chakra-ui/react'
import Link from 'next/link'
import ComparePlayers from 'components/ComparePlayers'
import { useDispatch, useSelector } from 'react-redux'
import { useUpdateFavoriteMutation } from 'generated/graphql'
import { ReducersProps } from 'redux-local'
import { useEffect, useState } from 'react'
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts'
import {
  DataChartProps,
  AccumulatorProps,
  generatePlayerFields,
  playerRadarChartDataConstructor
} from 'utils/playerMethods'

export type PlayerHeaderProps = {
  player: PlayerProps
}

const PlayerHeader = ({ player }: PlayerHeaderProps) => {
  const dispatch = useDispatch()

  const [chartData, setChartData] = useState<DataChartProps[]>([])
  const [playerTopAttrs, setPlayerTopAttrs] = useState<AccumulatorProps[]>([])
  const [comparePlayersOpen, setComparePlayersOpen] = useState<boolean>(false)
  const [isFavorited, setIsFavorited] = useState<boolean>(false)
  const [favoriteId, setFavoriteId] = useState<string>('')
  const [favoritedPlayers, setFavoritedPlayers] = useState<number[]>([])
  const comparedPlayers = useSelector(
    ({ playerReducer }: ReducersProps) => playerReducer.players
  )
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)

  const [
    updateFavoriteMutation,
    { loading: loadingFavorites }
  ] = useUpdateFavoriteMutation({})

  const controlFavorites = () => {
    if (isFavorited) {
      const favorites = localStorage.getItem('favorites')
      if (favorites) {
        const f = JSON.parse(favorites)
        const players = f.players.filter(
          (p: number) => p.toString() !== player?.id
        )
        console.log('favorites now: ', players)
        localStorage.setItem(
          'favorites',
          JSON.stringify({
            id: favoriteId,
            players
          })
        )
        updateFavoriteMutation({
          variables: {
            id: favoriteId,
            players: players.map((p: number) => p.toString())
          }
        }).then(() => {
          setIsFavorited(false)
          localStorage.setItem(
            'favorites',
            JSON.stringify({
              id: favoriteId.toString(),
              players: [...favoritedPlayers, parseInt(player?.id ?? '-1')]
            })
          )
        })
      }
    } else {
      updateFavoriteMutation({
        variables: {
          id: favoriteId,
          players: Array.from(
            new Set([...favoritedPlayers, parseInt(player?.id ?? '-1')])
          ).map((p: number) => p.toString())
        }
      }).then(() => {
        setIsFavorited(true)
        localStorage.setItem(
          'favorites',
          JSON.stringify({
            id: favoriteId,
            players: Array.from(
              new Set([...favoritedPlayers, parseInt(player?.id ?? '-1')])
            )
          })
        )
      })
    }
  }

  useEffect(() => {
    const favorites = localStorage.getItem('favorites')
    if (favorites) {
      const f = JSON.parse(favorites)
      console.log('favorites: ', f, player.id)
      setFavoriteId(f.id)
      setFavoritedPlayers(f.players)
      if (f.players.find((p: number) => p === parseInt(player?.id ?? '-1'))) {
        setIsFavorited(true)
      } else {
        setIsFavorited(false)
      }
    }
    const chartData: DataChartProps[] = playerRadarChartDataConstructor(
      player,
      player?.best_position === 'GK'
    )
    const { topAttributes } = generatePlayerFields(player)
    setChartData(chartData)
    setPlayerTopAttrs(topAttributes)
  }, [player])

  const addPlayerToComparison = (player: PlayerProps) => {
    if (
      !comparedPlayers.find(
        (p: PlayerProps) => p?.player_id === player?.player_id
      )
    ) {
      dispatch({
        type: 'SET_PLAYERS',
        payload: {
          players: [player]
        }
      })
    } else {
      alert('This player is already on the compared players list')
    }
    setComparePlayersOpen(true)
  }

  return (
    <S.Wrapper>
      <ComparePlayers
        controlFunction={setComparePlayersOpen}
        visible={comparePlayersOpen}
      ></ComparePlayers>
      <span></span>
      <Container>
        <S.Grid>
          <S.PlayerMainStatsContainer>
            <S.PlayerNameContainer>
              {player?.jersey_number && (
                <S.PlayerJerseyNumber aria-label="player jersey">
                  {player?.jersey_number}
                </S.PlayerJerseyNumber>
              )}
              <S.Image
                alt={`${player?.name} player image`}
                src={player?.photo?.url ?? '/img/notfound_player.webp'}
              ></S.Image>
              <S.PlayerMainInfoWrapper>
                <S.Heading aria-label="player name">{player?.name}</S.Heading>
                <S.PlayerMainDataContainer>
                  <S.PlayerMainDataWrapper>
                    <S.MainDataImage
                      alt={`${player?.nation?.name} nation image`}
                      src={
                        player?.nation?.image?.url ?? '/img/notfound_club.webp'
                      }
                    />
                    <Link href={`/nation/${player?.nation?.slug}`}>
                      <S.MainData aria-label="nation name">
                        {player?.nation?.name}
                      </S.MainData>
                    </Link>
                  </S.PlayerMainDataWrapper>
                  <S.PlayerMainDataWrapper>
                    <S.MainDataImage
                      alt={`${player?.team?.name} team image`}
                      src={
                        player?.team?.image?.url ?? '/img/notfound_club.webp'
                      }
                    />
                    <Link href={`/team/${player?.team?.slug}`}>
                      <S.MainData aria-label="team name">
                        {player?.team?.name}
                      </S.MainData>
                    </Link>
                  </S.PlayerMainDataWrapper>
                </S.PlayerMainDataContainer>
              </S.PlayerMainInfoWrapper>
            </S.PlayerNameContainer>
            <S.Line />
            <S.CommonStatsContainer>
              <S.CommomStat aria-label="player age">
                Age: <span>{player?.age} years</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player height">
                Height: <span>{player?.height}</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player weight">
                Weight: <span>{player?.weight}</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player weak foot">
                {player?.weak_foot}
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Weak Foot</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player skill moves">
                {player?.skill_moves}
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Skill Moves</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player international reputation">
                {player?.international_reputation}
                <S.IconWrapperMini>
                  <StarIcon />
                </S.IconWrapperMini>
                <span>Int. Rep.</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player work rate">
                W.R:<span>{player?.work_rate}</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player foot">
                Foot
                <S.IconWrapper>
                  <FootIcon />
                </S.IconWrapper>
                :<span>{player?.preferred_foot}</span>
              </S.CommomStat>
              <S.CommomStat aria-label="player real face">
                Real Face:
                <span>
                  {player?.real_face ? (
                    <S.IconWrapper>
                      <CheckIcon />
                    </S.IconWrapper>
                  ) : (
                    <S.IconWrapper>
                      <CloseIcon />
                    </S.IconWrapper>
                  )}
                </span>
              </S.CommomStat>
              <S.CommomStat>
                <Button
                  onClick={() => addPlayerToComparison(player)}
                  size="lg"
                  colorScheme="white"
                  variant="outline"
                >
                  Compare
                </Button>
              </S.CommomStat>
              {user && (
                <S.CommomStat>
                  <Button
                    isLoading={loadingFavorites}
                    onClick={() => controlFavorites()}
                    variant={isFavorited ? 'solid' : 'outline'}
                    colorScheme={isFavorited ? 'pink' : 'white'}
                  >
                    {isFavorited ? 'Remove from favorites' : 'Add to Favorites'}
                  </Button>
                </S.CommomStat>
              )}
            </S.CommonStatsContainer>
          </S.PlayerMainStatsContainer>
          <S.PlayerMainStatsContainer>
            <S.PlayerStatsContainer>
              <S.PlayerStatsContainer>
                <PlayerStat label="Overall" stat={player?.overall ?? 0} />
                <PlayerStat label="Potential" stat={player?.potential ?? 0} />
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
                    width={400}
                    height={300}
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
