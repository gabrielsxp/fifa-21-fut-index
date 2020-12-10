import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import media from 'styled-media-query'

export const Wrapper = styled.section`
  overflow: auto;
`

type OverlayProps = {
  visible?: boolean
}

export const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  outline: none;
  background: transparent;
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  ${({ theme }) => css`
    > svg {
      width: 100%;
      height: 100%;
      color: ${theme.colors.white};
    }
  `}
`

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  ${({ theme, visible }) => css`
    background-color: ${rgba('#333', 0.9)};
    z-index: ${visible ? theme.layers.alwaysOnTop : -100};
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'all' : 'none'};
    padding: ${theme.spacings.small} 0;
  `}
  > div {
    height: auto;
    display: flex;
    align-items: center;
  }

  ${media.lessThan('medium')`
    min-height: 100vh;
    overflow: auto;

    > div {
      height: 100vh;
      overflow: auto;
    }
  `}
`
export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: ${theme.grid.gutter};

    ${media.lessThan('medium')`
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
`

export const PlayerContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    > div {
      margin-bottom: ${theme.spacings.xxsmall};
    }
    > button {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`
export const EmptyPlayerColumn = styled.div`
  ${({ theme }) => css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${theme.colors.white};
    font-weight: bold;
    font-size: ${theme.font.sizes.medium};
    transition: all 0.3s ease;
    border: 0.1rem solid ${theme.colors.white};
    border-radius: ${theme.border.radius};
    cursor: pointer;
    min-height: 100%;
    min-width: 22.5rem;
    text-align: center;
    background-color: ${rgba(theme.colors.secondary, 0.1)};
    &:hover {
      border-color: ${theme.colors.secondary};
      color: ${theme.colors.secondary};
      background-color: ${rgba(theme.colors.secondary, 0.15)};
      svg {
        color: ${theme.colors.secondary};
      }
    }
    > ${IconWrapper} {
      position: relative;
      top: 0;
      left: 0;
      width: 2rem;
      height: 2rem;
      margin-bottom: ${theme.spacings.xxsmall};
    }
    ${media.lessThan('medium')`
      min-width: 14rem;
      height: max-content;
    `}
  `}
`
export const PlayerPosition = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.white};
    font-weight: normal;
    text-align: center;
  `}
`
export const SimilarPlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;

  ${media.lessThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`
export const CardWrapper = styled.div`
  position: relative;
  cursor: pointer;
  > * {
    pointer-events: none;
  }
`

export const SectionHeading = styled.h2`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    font-size: ${theme.font.sizes.small};
    font-weight: bold;
  `}
`
export const SimilarPlayersContainer = styled.div`
  display: flex;
  flex-direction: column;
`
