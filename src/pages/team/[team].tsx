import withApollo from 'utils/withApollo'
import TeamHeader from 'components/TeamHeader'
import { useTeamPageQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import Loading from 'components/Loading'
import Error from 'components/Error'
import TeamTemplate from 'templates/TeamTemplate'
import TeamPlayers from 'components/TeamPlayers'
import { Player as PlayerProps } from 'generated/graphql'
import { Container } from 'components/Container'
import { sortPlayersByOverall } from 'utils/teamMethods'

const Team = () => {
  const router = useRouter()
  let { team: slug } = router.query
  if (!slug) {
    slug = ''
  }
  if (Array.isArray(slug)) {
    slug = slug[0]
  }
  console.log('slug: ', slug)
  const { data, loading, error } = useTeamPageQuery({
    variables: {
      slug
    }
  })
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  if (data?.teams?.length === 0) {
    return <Error />
  }
  return (
    <TeamTemplate>
      {data?.teams && data.teams[0] && (
        <>
          <TeamHeader team={data.teams[0]} />
          <Container>
            <TeamPlayers
              players={sortPlayersByOverall(
                Object.assign([], data.teams[0]?.players as PlayerProps[])
              )}
            />
          </Container>
        </>
      )}
    </TeamTemplate>
  )
}

export default withApollo({ ssr: true })(Team)
