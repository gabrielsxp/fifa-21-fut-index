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
import Head from 'next/head'
import { NextSeo } from 'next-seo'

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
    <>
      {data && data?.players && data?.players[0] && (
        <Head>
          <title>Fifa Stats Player - {data?.players[0]?.name}</title>
          <meta
            name="description"
            content={`${data?.players[0]?.name} - Overall: ${data?.players[0]?.overall} | Potential: ${data?.players[0]?.potential}`}
          />
          <link
            rel="shortcut icon"
            href={
              data?.players[0]?.photo?.url
                ? data?.players[0]?.photo?.url.replace('http://', 'https://')
                : data?.players[0]?.photo?.url
            }
          />
          <link
            rel="apple-touch-icon"
            href={
              data?.players[0]?.photo?.url
                ? data?.players[0]?.photo?.url.replace('http://', 'https://')
                : data?.players[0]?.photo?.url
            }
          />
        </Head>
      )}
      {data && data?.players && data?.players[0] && (
        <NextSeo>
          title={`${data.players[0]?.name}`} description=
          {`Overall: ${data?.players[0]?.overall} | Potential: ${data?.players[0]?.potential}`}{' '}
          canonical=
          {`https://kofastools.com/player/${data.players[0]?.player_id}`}{' '}
          openGraph=
          {{
            url: `https://kofastools.com/player/${data.players[0]?.player_id}`,
            title: `${data.players[0]?.name}`,
            description: `Overall: ${data?.players[0]?.overall} | Potential: ${data?.players[0]?.potential}`,
            images: [{ url: data.players[0]?.photo?.url }],
            site_name: `Fifa Stats`,
            locale: 'en_US'
          }}
        </NextSeo>
      )}
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
    </>
  )
}

export default withApollo({ ssr: true })(Player)
