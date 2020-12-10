import PlayerTemplate from 'templates/PlayerTemplate'
import HomeSearch from 'components/HomeSearch'
import withApollo from 'utils/withApollo'
import {
  usePlayerSearchQuery,
  usePlayerSearchLazyQuery
} from 'generated/graphql'
import { useDispatch } from 'react-redux'
import Loading from 'components/Loading'
import Error from 'components/Error'
import TopPlayers from 'components/TopPlayers'
import PlainComparison from 'components/PlainComparison'
import { getRandomPlayersQuery } from 'utils/playerMethods'
import { Player as PlayerProps } from 'generated/graphql'
import { useState, useEffect } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const [lazyExecution, setLazyExecution] = useState(false)
  const {
    data: topPlayers,
    loading: loadingTopPlayers,
    error: topPlayersError
  } = usePlayerSearchQuery({
    variables: {
      limit: 24,
      sort: 'overall:DESC'
    }
  })
  const [
    search,
    { data: comparisonPlayers, loading: loadingComparisonPlayers }
  ] = usePlayerSearchLazyQuery({
    variables: getRandomPlayersQuery(5)
  })
  useEffect(() => {
    if (!lazyExecution) {
      search()
      setLazyExecution(true)
    }
  }, [lazyExecution, search])
  if (loadingTopPlayers) {
    return <Loading />
  }
  if (topPlayersError) {
    return <Error />
  }
  if (topPlayers && topPlayers?.players) {
    dispatch({
      type: 'SET_TOP_PLAYERS',
      payload: { players: topPlayers.players.slice(0, 12) }
    })
  }
  console.log('loading: ', loadingComparisonPlayers)
  return (
    <PlayerTemplate>
      <HomeSearch />
      <PlainComparison
        loading={loadingComparisonPlayers}
        scheme="dark"
        players={comparisonPlayers?.players as PlayerProps[]}
      />
      <TopPlayers
        color="primary"
        players={topPlayers?.players as PlayerProps[]}
      />
    </PlayerTemplate>
  )
}

export default withApollo({ ssr: true })(Home)
