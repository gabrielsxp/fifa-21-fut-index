import DashboardTemplate from 'templates/DashboardTemplate'
import withApollo from 'utils/withApollo'
import Heading from 'components/Heading'
import Loading from 'components/Loading'
import Error from 'components/Error'
import * as S from 'templates/DashboardTemplate/styles'
import { useGetFavoritesQuery, Player as PlayerProps } from 'generated/graphql'
import { useSelector } from 'react-redux'
import { ReducersProps } from 'redux-local'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'
import { Favorite as FavoriteProps } from 'generated/graphql'

const Favorites = () => {
  const user = useSelector(({ userReducer }: ReducersProps) => userReducer.user)
  const { data, loading, error } = useGetFavoritesQuery({
    variables: {
      where: {
        users_permissions_user: {
          id: user?.id
        }
      },
      sort: 'updated_at:DESC'
    },
    fetchPolicy: 'no-cache'
  })
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  let favorites: FavoriteProps[] = []
  let favorite: FavoriteProps = {}
  if (data?.favorites) {
    favorites = data?.favorites?.filter(
      (f) => f && f?.players && f?.players?.length > 0
    ) as FavoriteProps[]
    if (favorites.length > 0) {
      favorite = favorites[0]
    }
  }
  return (
    <DashboardTemplate>
      <>
        <S.Header>
          <Heading color="light">Dashboard</Heading>
          <Heading color="light" size="small">
            Favorites
          </Heading>
        </S.Header>
        <S.NoResultSWrapper>
          {data && data?.favorites?.length === 0 && (
            <Heading size="small" color="dark">
              You do not have any favorites yet !
            </Heading>
          )}
        </S.NoResultSWrapper>
        <S.Container>
          {favorite &&
            favorite.id &&
            favorite?.players?.map((player, index) => {
              return (
                <PlayerCard
                  key={index}
                  variant="small"
                  {...playerCardDataFormatted(player as PlayerProps)}
                />
              )
            })}
        </S.Container>
      </>
    </DashboardTemplate>
  )
}

export default withApollo({ ssr: true })(Favorites)
