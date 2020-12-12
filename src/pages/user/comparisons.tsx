import DashboardTemplate from 'templates/DashboardTemplate'
import withApollo from 'utils/withApollo'
import Heading from 'components/Heading'
import Loading from 'components/Loading'
import Error from 'components/Error'
import { Button } from '@chakra-ui/react'
import { Container } from 'components/Container'
import * as S from 'templates/DashboardTemplate/styles'
import {
  useGetComparisonsQuery,
  useDeleteComparisonMutation,
  GetComparisonsDocument,
  Player as PlayerProps
} from 'generated/graphql'
import { useSelector } from 'react-redux'
import { ReducersProps } from 'redux-local'
import PlainComparison from 'components/PlainComparison'

const Favorites = () => {
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)
  const { data, loading, error } = useGetComparisonsQuery({
    variables: {
      where: {
        users_permissions_user: {
          id: user?.id
        }
      },
      sort: 'created_at:DESC'
    },
    fetchPolicy: 'network-only'
  })

  const [
    deleteComparisonMutation,
    { loading: deletingComparison }
  ] = useDeleteComparisonMutation({})

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  if (data?.comparisons) {
    console.log('comparisons: ', data?.comparisons)
  }

  const deleteComparisonFunction = (id: string) => {
    deleteComparisonMutation({
      variables: {
        id
      },
      refetchQueries: [{ query: GetComparisonsDocument }]
    })
  }

  return (
    <DashboardTemplate>
      <>
        <S.Header>
          <Heading color="light">Dashboard</Heading>
          <Heading color="light" size="small">
            Comparisons
          </Heading>
        </S.Header>
        <S.NoResultSWrapper>
          {data && data?.comparisons?.length === 0 && (
            <Heading size="small" color="dark">
              You do not have any comparisons yet !
            </Heading>
          )}
        </S.NoResultSWrapper>
        <S.ComparisonsContainer>
          {data &&
            data?.comparisons &&
            data?.comparisons?.map((comparison, index) => {
              return (
                <div key={index}>
                  <Container>
                    <Button
                      my={4}
                      onClick={() =>
                        deleteComparisonFunction(comparison?.id ?? '')
                      }
                      isLoading={deletingComparison}
                      colorScheme="red"
                      disable={loading}
                    >
                      {!loading
                        ? 'Delete this comparison'
                        : 'Updating Comparison List'}
                    </Button>
                  </Container>
                  <PlainComparison
                    players={comparison?.players as PlayerProps[]}
                    scheme="dark"
                    title=" "
                    subtitle=" "
                  />
                  <S.ComparisonLine />
                </div>
              )
            })}
        </S.ComparisonsContainer>
      </>
    </DashboardTemplate>
  )
}

export default withApollo({ ssr: true })(Favorites)
