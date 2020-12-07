import styled, { css } from 'styled-components'

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  overflow: hidden;
`
export const Text = styled.h1`
  ${({ theme }) => css`
    font-size: 10rem;
    color: ${theme.colors.primary};
    font-weight: bold;
  `}
`

export const Title = styled.h2`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.secondary};
    font-weight: bold;
  `}
`

export const Subtitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.secondary};
  `}
`
