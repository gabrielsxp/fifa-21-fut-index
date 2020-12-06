import withApollo from 'utils/withApollo'
import PlayerHeader from 'components/PlayerHeader'
import { useGetPlayerQuery } from 'generated/graphql'

const Player = () => {
  const { data, loading, error } = useGetPlayerQuery({
    variables: {
      id: 158023
    }
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error fetching players data</div>
  }
  return (
    <>
      {data && data.players && data.players[0] && (
        <PlayerHeader player={data.players[0]} />
      )}
    </>
  )
}

export default withApollo({ ssr: true })(Player)
