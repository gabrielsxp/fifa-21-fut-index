import styled, { css } from 'styled-components'
import { rgba } from 'polished'
import media from 'styled-media-query'

type OverlayProps = {
  visible?: boolean
}

export const Wrapper = styled.main``

export const SignContainer = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
    padding: ${theme.spacings.small};
    width: 50rem;
    border-radius: ${theme.border.radius};
    height: 60rem;
    display: flex;
    align-items: center;
    > div {
      width: 100%;
    }
    ${media.lessThan('medium')`
      width: 100%;
    `}
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
  justify-content: center;
  align-items: center;
  ${({ theme, visible }) => css`
    background-color: ${rgba('#333', 0.9)};
    z-index: ${visible ? theme.layers.alwaysOnTop : -100};
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'all' : 'none'};
    padding: ${theme.spacings.small};
  `}
  ${media.lessThan('medium')`
    min-height: 100vh;
    overflow: auto;
  `};
`
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
export const Logo = styled.h1`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-weight: bold;
    font-style: italic;
    letter-spacing: -0.5rem;
    font-size: 4rem;
    z-index: 10;
    line-height: 4rem;
    text-transform: uppercase;
  `}
`

export const TopSection = styled.div`
  width: 100%;
  > * {
    text-align: center;
  }
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  > * {
    margin-bottom: 1rem;
  }
`

export const ForgetPassword = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xsmall};
    text-align: right:
    cursor: pointer!important;
    text-decoration: underline;
    margin: ${theme.spacings.xxsmall} 0;
    color: ${theme.colors.primary};
  `}
`

export const LocalErrorsContainer = styled.ul`
  width: 100%;
  padding: 0 2rem;
`

export const LocalError = styled.li`
  ${({ theme }) => css`
    color: #cf1934;
    font-size: ${theme.font.sizes.xsmall};
  `}
`
