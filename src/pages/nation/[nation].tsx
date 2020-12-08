import withApollo from 'utils/withApollo'
import TeamHeader from 'components/TeamHeader'
import { useNationPageQuery } from 'generated/graphql'
import { useRouter } from 'next/router'
import Loading from 'components/Loading'
import Error from 'components/Error'
import TeamTemplate from 'templates/TeamTemplate'
import TeamPlayers from 'components/TeamPlayers'
import { Player as PlayerProps } from 'generated/graphql'
import { Container } from 'components/Container'
import { sortPlayersByOverall } from 'utils/teamMethods'

const Nation = () => {
  const router = useRouter()
  let { nation: slug } = router.query
  if (!slug) {
    slug = ''
  }
  if (Array.isArray(slug)) {
    slug = slug[0]
  }
  if (slug === 'brasil') {
    slug = 'brazil'
  }
  const { data, loading, error } = useNationPageQuery({
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
  if (data?.nations?.length === 0) {
    return <Error />
  }
  return (
    <TeamTemplate>
      {data?.nations && data.nations[0] && (
        <>
          <TeamHeader team={data.nations[0]} />
          <Container>
            <TeamPlayers
              players={sortPlayersByOverall(
                Object.assign([], data.nations[0]?.players as PlayerProps[])
              )}
            />
          </Container>
        </>
      )}
    </TeamTemplate>
  )
}

export default withApollo({ ssr: true })(Nation)
