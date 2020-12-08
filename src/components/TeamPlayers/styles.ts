import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { darken, lighten } from 'polished'

export const Wrapper = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.xsmall};
    margin: ${theme.spacings.xsmall} 0;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `}
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;

  ${media.lessThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`
export const SectionHeading = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    color: ${darken(0.2, theme.colors.primary)};
    margin: ${theme.spacings.xsmall} 0;
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
  `}
`
export const SortHeading = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${darken(0.2, theme.colors.black)};
    margin: ${theme.spacings.xsmall} 0;
    text-align: left;
    font-weight: bold;
  `}
`
export const PreSortWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const SortWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > * {
      margin-right: ${theme.spacings.xsmall};
    }
    > button:last-of-type {
      margin-right: 0;
    }
  `}
`
export const SectionContainer = styled.div`
  ${({ theme }) => css`
    border-radius: ${theme.border.radius};
    border: 0.1rem solid ${lighten(0.1, theme.colors.black)};
    padding: ${theme.spacings.xsmall};
    display: flex;
    flex-direction: column;
    height: 40rem;
    overflow: auto;
    transition: border-color 0.3s ease;

    ::-webkit-scrollbar {
      width: 0.5rem;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: ${darken(0.1, theme.colors.primary)};
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: ${lighten(0.1, theme.colors.primary)};
      width: 5px;
    }
    &:hover {
      border-color: ${theme.colors.primary};
    }
  `}
`

export const SectionColumnGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
`

export const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  ${media.lessThan('medium')`
    grid-template-columns: repeat(1, 1fr);
  `}
`

export const SectionNameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const SectionName = styled.div`
  ${({ theme }) => css`
    color: ${darken(0.2, theme.colors.primary)};
    font-weight: bold;
    font-size: ${theme.font.sizes.medium};
  `}
`
export const SectionNumber = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.font.sizes.medium};
    font-weight: bold;
  `}
`
