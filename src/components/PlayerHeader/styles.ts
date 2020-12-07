import styled, { css } from 'styled-components'
import { rgba, darken } from 'polished'
import media from 'styled-media-query'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: relative;
    padding-top: 7rem;
    width: 100%;
    min-height: 30rem;

    & > div {
      position: relative;
      height: 100%;
      z-index: ${theme.layers.base};
      display: flex;
      align-items: center;
      flex-direction: row;
    }

    & > span {
      position: absolute;
      top: 0;
      left: 0;
      background-color: ${rgba(darken(0.2, theme.colors.primary), 0.7)};
      background-size: cover;
      width: 100%;
      height: 100%;
      z-index: 1;
    }
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background-image: url('/img/playerpattern.webp');
      background-size: cover;
      width: 100%;
      height: 100%;
      z-index: 0;
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      background-image: url('/img/playerbg.webp');
      background-size: cover;
      background-position: 50% 50%;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  `}
`

export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    grid-gap: ${theme.grid.gutter};
    ${media.lessThan('medium')`
      grid-template-columns: repeat(1, 1fr);
    `}
  `}
`

export const PlayerMainStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const PlayerStatsContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    > div {
      margin-right: ${theme.spacings.small};
    }
  `}
`

export const PlayerNameContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

export const PlayerJerseyNumber = styled.div`
  ${({ theme }) => css`
    position: absolute;
    top: -25%;
    letter-spacing: -1rem;
    font-size: 8rem;
    right: 0;
    color: ${rgba(theme.colors.secondary, 0.4)};
    font-weight: bold;
  `}
`

export const Heading = styled.h1`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xxlarge};
    color: ${theme.colors.secondary};
    margin-right: ${theme.spacings.small};
  `}
`

export const SectionHeading = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.white};
    margin: ${theme.spacings.xsmall} 0;
  `}
`

export const Image = styled.img`
  width: 7rem;
  height: 7rem;
  position: relative;
  z-index: 11;
`
export const Line = styled.hr`
  ${({ theme }) => css`
    border: none;
    border-top: 0.1rem solid ${theme.colors.secondary};
    width: 100%;
  `}
`
export const CommomStat = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.small};
    font-weight: bold;
    & > span {
      font-weight: normal;
      margin-left: ${theme.spacings.xxsmall};
      transition: color 0.3s ease;
      &:hover {
        color: ${theme.colors.secondary};
      }
    }
  `}
`
export const CommonStatsContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    margin-top: ${theme.spacings.xsmall};

    ${media.lessThan('medium')`
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
`
export const IconWrapper = styled.div`
  ${({ theme }) => css`
    width: 2.4rem;
    height: 2.4rem;
    color: ${theme.colors.white};
  `}
`
export const IconWrapperMini = styled.div`
  ${({ theme }) => css`
    width: 1.6rem;
    height: 1.6rem;
    margin-bottom: 0.3rem;
    margin-left: 0.3rem;
    > svg {
      color: ${theme.colors.white};
    }
  `}
`
export const PlayerMainDataWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    margin-right: ${theme.spacings.xxsmall};
  `}
`

export const MainDataImage = styled.img`
  height: 1.6rem;
  width: auto;
  margin-right: 0.3rem;
`

export const MainData = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    color: ${theme.colors.white};
  `}
`
export const PlayerMainInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const PlayerMainDataContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
`
export const TopStatsContainer = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(2, 1fr);
  ${media.lessThan('medium')`
    grid-template-columns: repeat(1, 1fr);
  `}
`
export const ChartWrapper = styled.div`
  width: 40rem;
  height: 30rem;
  & tspan {
    fill: white;
  }

  ${media.lessThan('medium')`
    width: 34rem;
  `}
`
