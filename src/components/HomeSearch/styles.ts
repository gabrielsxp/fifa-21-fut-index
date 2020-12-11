import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  > header {
    min-height: 43rem;
  }
`

export const LogoWrapper = styled.div`
  width: 100%;
  padding-top: 7rem;
  > h1 {
    text-align: center;
  }
`

export const Logo = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-weight: bold;
    font-style: italic;
    letter-spacing: -0.5rem;
    font-size: 10rem;
    z-index: 10;
    line-height: 9rem;
  `}
  ${media.lessThan('medium')`
    font-size: 5rem;
  `}
`
export const SearchInputsContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    padding-top: ${theme.spacings.xsmall};
    grid-template-columns: repeat(1, 1fr);
    grid-gap: ${theme.grid.gutter};
    margin-bottom: ${theme.spacings.small};
    ${media.greaterThan('medium')`
      padding: ${theme.spacings.small};
      grid-template-columns: 80% 20%;
    `}
  `}
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`
export const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  overflow: hidden;
  align-content: flex-start;
  grid-gap: 1rem;
  @media screen and (min-width: 400px) and (max-width: 599px) {
    grid-template-columns: repeat(4, 1fr);
  }
  ${media.between('small', 'medium')`
    grid-template-columns: repeat(4, 1fr);
  `}
  ${media.between('medium', 'large')`
    grid-template-columns: repeat(6, 1fr);
  `}
  ${media.greaterThan('large')`
    grid-template-columns: repeat(12, 1fr);
  `}
`
export const NoResults = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.white};
    font-weight: bold;
  `}
`

export const DisplayTopPlayersToggle = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.xsmall};
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5rem;
  `}
`
