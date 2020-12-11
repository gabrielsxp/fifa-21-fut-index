import * as S from 'templates/PlayerTemplate/styles'
import withApollo from 'utils/withApollo'
import PlayerHeader from 'components/PlayerHeader'
import PlayerAttributes from 'components/PlayerAttrbutes'
import PlayerTemplate from 'templates/PlayerTemplate'
import PlayerCard from 'components/PlayerCard'
import Loading from 'components/Loading'
import Error from 'components/Error'
import PlayerCardCarousel from 'components/PlayerCardCarousel'
import SectionBackground from 'components/SectionBackground'
import { Container } from 'components/Container'
import { useRouter } from 'next/router'
import { playerCardDataFormatted } from 'utils/playerMethods'
import { useEffect } from 'react'
import { Player as PlayerProps } from 'generated/graphql'
import { useGetPlayerQuery, usePlayerSearchLazyQuery } from 'generated/graphql'
import { useDispatch } from 'react-redux'

const Player = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { player: id } = router.query
  let idParam = 0
  if (Array.isArray(id)) {
    idParam = parseInt(id[0])
  }
  if (typeof id === 'string') {
    idParam = parseInt(id)
  }
  const { data, loading, error } = useGetPlayerQuery({
    variables: {
      id: idParam
    }
  })
  const [search, { data: similarPlayers }] = usePlayerSearchLazyQuery({
    fetchPolicy: 'no-cache',
    variables: {
      where: {
        best_position:
          data?.players && data?.players[0]
            ? data.players[0].best_position
            : 'ST',
        player_id_ne: id
      },
      sort: 'overall:DESC',
      limit: 10
    }
  })
  if (similarPlayers && similarPlayers?.players) {
    dispatch({
      type: 'SET_SIMILAR_PLAYERS',
      payload: { players: similarPlayers.players }
    })
  }
  useEffect(() => {
    search()
  }, [id, search])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }

  return (
    <PlayerTemplate>
      {data && data.players && data.players[0] && (
        <>
          <PlayerHeader player={data.players[0] as PlayerProps} />
          <Container>
            <S.Grid>
              <PlayerCard
                {...playerCardDataFormatted(data.players[0] as PlayerProps)}
              />
              <PlayerAttributes player={data.players[0] as PlayerProps} />
            </S.Grid>
          </Container>
          <SectionBackground>
            <Container>
              {similarPlayers && similarPlayers?.players && (
                <PlayerCardCarousel
                  title="Similar Players"
                  color="dark"
                  subtitle={`Players that also plays as ${data?.players[0]?.best_position}`}
                  items={similarPlayers.players as PlayerProps[]}
                />
              )}
            </Container>
          </SectionBackground>
        </>
      )}
    </PlayerTemplate>
  )
}

export default withApollo({ ssr: true })(Player)
