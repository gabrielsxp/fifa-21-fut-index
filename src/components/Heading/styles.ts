import styled, { css } from 'styled-components'
import { HeadingProps } from '.'

const headingModifier = {
  light: () => css`
    color: ${({ theme }) => theme.colors.white};
  `,
  dark: () => css`
    color: ${({ theme }) => theme.colors.black};
  `,
  primary: () => css`
    color: ${({ theme }) => theme.colors.primary};
  `,
  normal: () => css`
    font-size: ${({ theme }) => theme.font.sizes.xxlarge};
  `,
  small: () => css`
    font-size: ${({ theme }) => theme.font.sizes.medium};
  `,
  large: () => css`
    font-size: ${({ theme }) =>
      parseFloat(theme.font.sizes.xxlarge.replace('rem', '')) * 1.5 + 'rem'};
  `
}

export const Wrapper = styled.h2<HeadingProps>`
  ${({ color, size }) => css`
    font-family: 'Ubuntu';
    ${color && headingModifier[color!]};
    ${size && headingModifier[size!]};
  `}
`
