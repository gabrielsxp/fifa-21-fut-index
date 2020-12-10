import * as S from './styles'
import { Formik, Form } from 'formik'
import InputField from 'components/InputField'
import { Button } from '@chakra-ui/react'
import { usePlayerSearchLazyQuery } from 'generated/graphql'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'
import SectionBackground from 'components/SectionBackground'
import { Container } from 'components/Container'
import Heading from 'components/Heading'
import { useSelector } from 'react-redux'
import { Player as PlayerProps } from 'generated/graphql'
import { InitialStateProps } from 'redux-local/reducers/players'
import { useState } from 'react'

const HomeSearch = () => {
  const [search, { called, loading, data }] = usePlayerSearchLazyQuery({
    fetchPolicy: 'no-cache'
  })
  const [displayTopPlayers, setDisplayTopPlayers] = useState<boolean>(true)
  const topPlayers = useSelector((state: InitialStateProps) => state.topPlayers)
  return (
    <S.Wrapper>
      <SectionBackground reduced>
        <Container>
          <S.ContentWrapper>
            <S.LogoWrapper>
              <S.Logo>FIFA 21 STATS</S.Logo>
            </S.LogoWrapper>
            <Formik
              initialValues={{ name: '' }}
              onSubmit={async (values, { setErrors }) => {
                const { name } = values
                if (name === '') {
                  return setErrors({ name: 'You must fill this field' })
                } else if (name.length <= 3) {
                  return setErrors({
                    name: 'The players name must have more than 3 characters'
                  })
                }
                setDisplayTopPlayers(false)
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
                  <div>
                    <InputField
                      color="white"
                      name="name"
                      placeholder="Player's name"
                    />
                    {!displayTopPlayers && (
                      <S.DisplayTopPlayersToggle
                        onClick={() => setDisplayTopPlayers(true)}
                      >
                        Display Suggestions
                      </S.DisplayTopPlayersToggle>
                    )}
                  </div>
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
            {called && !displayTopPlayers && data && data?.players && (
              <Heading size="small">
                Players found: {data?.players?.length}
              </Heading>
            )}
            {displayTopPlayers && topPlayers && (
              <S.PlayersContainer>
                {topPlayers &&
                  topPlayers.map((player: PlayerProps, index: number) => {
                    return (
                      player && (
                        <PlayerCard
                          {...playerCardDataFormatted(player)}
                          key={index}
                          variant="small"
                        />
                      )
                    )
                  })}
              </S.PlayersContainer>
            )}
            <S.PlayersContainer>
              {!displayTopPlayers &&
                data &&
                data?.players?.map((card, index) => {
                  return (
                    card && (
                      <PlayerCard
                        {...playerCardDataFormatted(card)}
                        key={index}
                        variant="small"
                      />
                    )
                  )
                })}
              {called && !loading && (!data || data?.players?.length === 0) && (
                <S.NoResults>No players were found !</S.NoResults>
              )}
            </S.PlayersContainer>
          </S.ContentWrapper>
        </Container>
      </SectionBackground>
    </S.Wrapper>
  )
}

export default HomeSearch
