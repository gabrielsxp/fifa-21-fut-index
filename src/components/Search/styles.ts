import styled, { css } from 'styled-components'
import { NavbarProps } from 'components/Navbar'
import { rgba } from 'polished'
import media from 'styled-media-query'

type SearchOverlayProps = {
  visible?: boolean
}

type IconWrapperProps = {
  fixed?: boolean
} & NavbarProps

const IconWrapperModifier = {
  fixed: () => css`
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    height: 3rem;
  `
}

export const Wrapper = styled.main``

export const IconWrapper = styled.button<IconWrapperProps>`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  position: relative;
  ${({ theme, fixed, variant }) => css`
    > svg {
      width: 100%;
      height: 100%;
      color: ${theme.colors.white};
    }
    ${fixed && IconWrapperModifier['fixed']};
    ${media.greaterThan('medium')`
      > svg {
        color: ${variant ? theme.colors.secondary : theme.colors.white};
      }
    `}
  `}
`

export const SearchOverlay = styled.div<SearchOverlayProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transition: opacity 0.3s ease;
  ${({ theme, visible }) => css`
    background-color: ${rgba('#333', 0.8)};
    z-index: ${visible ? theme.layers.alwaysOnTop : -100};
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'all' : 'none'};
  `}
  > div {
    height: 100%;
  }
`
export const SearchInputsContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    padding-top: ${theme.spacings.xxlarge};
    grid-template-columns: repeat(1, 1fr);
    grid-gap: ${theme.grid.gutter};
    margin-bottom: ${theme.spacings.small};
    ${media.greaterThan('medium')`
      grid-template-columns: 90% 10%;
    `}
  `}
`

export const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  height: 80%;
  overflow-y: auto;
  align-content: flex-start;
  grid-gap: 1rem;
  ${media.greaterThan('medium')`
    grid-template-columns: repeat(3, 1fr);
  `}
`
export const NoResults = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.white};
    font-weight: bold;
  `}
`
