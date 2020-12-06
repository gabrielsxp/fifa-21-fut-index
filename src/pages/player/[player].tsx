import withApollo from 'utils/withApollo'
import PlayerHeader from 'components/PlayerHeader'
import PlayerAttributes from 'components/PlayerAttrbutes'
import { useGetPlayerQuery } from 'generated/graphql'
import { Container } from 'components/Container'
import { useRouter } from 'next/router'
import PlayerTemplate from 'templates/PlayerTemplate'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'
import * as S from 'templates/PlayerTemplate/styles'

const Player = () => {
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
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error fetching players data</div>
  }
  return (
    <PlayerTemplate>
      {data && data.players && data.players[0] && (
        <>
          <PlayerHeader player={data.players[0]} />
          <Container>
            <S.Grid>
              <PlayerCard {...playerCardDataFormatted(data.players[0])} />
              <PlayerAttributes player={data.players[0]} />
            </S.Grid>
          </Container>
        </>
      )}
    </PlayerTemplate>
  )
}

export default withApollo({ ssr: true })(Player)
