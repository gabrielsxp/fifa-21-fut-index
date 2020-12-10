import * as S from './styles'
import { SearchAlt as SearchIcon } from '@styled-icons/boxicons-regular/SearchAlt'
import React, { Dispatch, SetStateAction } from 'react'
import { Container } from 'components/Container'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { Formik, Form } from 'formik'
import InputField from 'components/InputField'
import { Button } from '@chakra-ui/react'
import { usePlayerSearchLazyQuery } from 'generated/graphql'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'
import { useDispatch, useSelector } from 'react-redux'
import { Player as PlayerProps } from 'generated/graphql'
import { InitialStateProps } from 'redux-local/reducers/players'

export type SearchCompareProps = {
  searchVisibilityControl: Dispatch<SetStateAction<boolean>>
  visible: boolean
}

const SearchCompare = ({
  visible,
  searchVisibilityControl
}: SearchCompareProps) => {
  const dispatch = useDispatch()
  const comparedPlayers = useSelector(
    (state: InitialStateProps) => state.players
  )
  const controlPlayerAdd = (player: PlayerProps) => {
    if (!comparedPlayers.find((p) => p?.player_id === player?.player_id)) {
      if (player?.best_position === 'GK') {
        if (!comparedPlayers.every((p) => p?.best_position === 'GK')) {
          return alert(
            'You cannot add a goalkeeper on a list with line field players !'
          )
        }
      }
      if (player?.best_position !== 'GK') {
        if (comparedPlayers.some((p) => p?.best_position === 'GK')) {
          return alert(
            'You cannot add a line field player on a list with goalkeepers !'
          )
        }
      }
      const c = Object.assign([], comparedPlayers)
      c.push(player)
      console.log('players: ', c)
      dispatch({
        type: 'SET_PLAYERS',
        payload: {
          players: c
        }
      })
      searchVisibilityControl(false)
    } else {
      alert('This player is already on the compared players list')
    }
  }
  const [search, { called, loading, data }] = usePlayerSearchLazyQuery({
    fetchPolicy: 'no-cache'
  })

  return (
    <S.Wrapper>
      <S.SearchOverlay
        data-testid="search-container"
        aria-hidden={visible}
        visible={visible}
      >
        <Container>
          <S.IconWrapper
            fixed
            visible={visible}
            onClick={() => searchVisibilityControl(!visible)}
          >
            <CloseIcon aria-label="search close icon" />
          </S.IconWrapper>
          <Formik
            initialValues={{ name: '' }}
            onSubmit={async (values, { setErrors }) => {
              const { name } = values
              if (name === '') {
                return setErrors({ name: 'You must fill this field' })
              }
              search({
                variables: {
                  where: {
                    name_contains: name
                  },
                  sort: 'overall:DESC'
                }
              })
            }}
          >
            <Form>
              <S.SearchInputsContainer>
                <InputField
                  color="white"
                  name="name"
                  placeholder="Player name"
                />
                <Button
                  isLoading={loading}
                  size="lg"
                  type="submit"
                  colorScheme="green"
                >
                  Search
                </Button>
              </S.SearchInputsContainer>
            </Form>
          </Formik>
          <S.PostsContainer>
            {data &&
              data?.players?.map((card, index) => {
                return (
                  card && (
                    <S.CardWrapper onClick={() => controlPlayerAdd(card)}>
                      <PlayerCard
                        {...playerCardDataFormatted(card)}
                        key={index}
                      />
                    </S.CardWrapper>
                  )
                )
              })}
            {called && !loading && (!data || data?.players?.length === 0) && (
              <S.NoResults>No Posts were found !</S.NoResults>
            )}
          </S.PostsContainer>
        </Container>
      </S.SearchOverlay>
      <S.IconWrapper onClick={() => searchVisibilityControl(!visible)}>
        <SearchIcon aria-label="search icon" />
      </S.IconWrapper>
    </S.Wrapper>
  )
}

export default SearchCompare
