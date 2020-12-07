import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { rgba } from 'polished'
import { NavbarProps } from '.'

type NavLinkProps = {
  dark?: boolean
} & NavbarProps

export const Wrapper = styled.div<NavbarProps>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  ${({ theme, variant }) => css`
    z-index: ${theme.layers.overlay};
    height: ${variant ? '7rem' : '14rem'};
  `}
  ${media.lessThan('medium')`
      height: 5rem;
  `}
  & [class^="Container"] {
    max-height: 100%;
  }
`
export const TopBar = styled.div<NavbarProps>`
  background: transparent;
  height: 7rem;
  width: 100%;
  ${({ variant }) => css`
    display: ${variant ? 'none' : 'block'};
  `}
`
export const TopBarWrapper = styled.div`
  background: inherit;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
`

export const BottomBar = styled.div<NavbarProps>`
  ${({ theme, variant }) => css`
    position: relative;
    background-color: ${variant ? 'transparent' : theme.colors.primary};
    height: 7rem;
    width: 100vw;
    top: 7rem;
    transition: all 0.1s ease;

    ${media.lessThan('medium')`
      height: 5rem;
      background-color: ${theme.colors.secondary};
    `}
  `}
`
export const NavLink = styled.a<NavLinkProps>`
  ${({ theme, dark, variant }) => css`
    font-size: ${dark ? theme.font.sizes.large : theme.font.sizes.medium};
    color: ${dark || variant ? theme.colors.secondary : theme.colors.white};
    font-weight: bold;
    transition: color 0.3s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${rgba(dark ? theme.colors.primary : theme.colors.secondary, 0.5)};
    }
  `}
`

export const ContentWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-grow: 1;
    > div > a {
      margin-right: ${theme.spacings.small};
    }
    > div > a:last-of-type {
      margin-right: 0;
    }
    > div:first-child {
      margin-right: ${theme.spacings.small};
    }
  `}
`
export const NavWrapper = styled.nav`
  width: 100%;
  height: 7rem;
  display: flex;
  align-items: center;

  ${media.lessThan('medium')`
      height: 5rem;
    `}
`
export const IconWrapper = styled.button<NavbarProps>`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  outline: none;
  background: transparent;
  cursor: pointer;
  margin-left: 0.5rem;
  ${({ theme }) => css`
    > svg {
      width: 100%;
      height: 100%;
      color: ${theme.colors.white};
    }
  `}
`

export const MobileMenu = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 7rem 0;
  position: fixed;
  transition: all 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-100%);
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
  &.display-mobile-menu {
    transform: translateY(0%);
    opacity: 1;
  }
`

export const MobileMenuWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => css`
    > a {
      margin-bottom: ${theme.spacings.small};
    }
  `}
`
