import * as S from './styles'
import { SearchAlt as SearchIcon } from '@styled-icons/boxicons-regular/SearchAlt'
import React, { useState } from 'react'
import { Container } from 'components/Container'
import { Close as CloseIcon } from '@styled-icons/evaicons-solid/Close'
import { NavbarProps } from 'components/Navbar'
import { Formik, Form } from 'formik'
import InputField from 'components/InputField'
import { Button } from '@chakra-ui/react'
import { usePlayerSearchLazyQuery } from 'generated/graphql'
import PlayerCard from 'components/PlayerCard'
import { playerCardDataFormatted } from 'utils/playerMethods'

const Search = ({ variant = false }: NavbarProps) => {
  const [search, { called, loading, data }] = usePlayerSearchLazyQuery({
    fetchPolicy: 'no-cache'
  })
  const [isSearchOpened, setIsSearchOpened] = useState<boolean>(false)
  return (
    <S.Wrapper>
      <S.SearchOverlay
        data-testid="search-container"
        aria-hidden={isSearchOpened}
        visible={isSearchOpened}
      >
        <Container>
          <S.IconWrapper
            fixed
            onClick={() => setIsSearchOpened(!isSearchOpened)}
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
                    <PlayerCard
                      {...playerCardDataFormatted(card)}
                      closeSearchFunction={setIsSearchOpened}
                      key={index}
                    />
                  )
                )
              })}
            {called && !loading && (!data || data?.players?.length === 0) && (
              <S.NoResults>No Posts were found !</S.NoResults>
            )}
          </S.PostsContainer>
        </Container>
      </S.SearchOverlay>
      <S.IconWrapper
        variant={variant}
        onClick={() => setIsSearchOpened(!isSearchOpened)}
      >
        <SearchIcon aria-label="search icon" />
      </S.IconWrapper>
    </S.Wrapper>
  )
}

export default Search
