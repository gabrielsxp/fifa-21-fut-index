import { lighten } from 'polished'
import styled, { css } from 'styled-components'

import { PlayerStatProps } from '.'

type WrapperProps = {
  type: 'red' | 'orange' | 'light-green' | 'green'
}

const typeColorModifier = (type: string) => {
  switch (type) {
    case 'red':
      return '#bd2f2f'
      break
    case 'orange':
      return '#c8790a'
      break
    case 'light-green':
      return '#99cf46'
      break
    case 'green':
      return '#4e8142'
      break
    default:
      return '#e3e1e1'
  }
}

export const MainWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, type }) => css`
    width: max-content;
    padding: calc(${theme.spacings.xsmall} / 2) ${theme.spacings.xsmall};
    border-radius: ${theme.border.radius};
    color: ${theme.colors.white};
    text-align: center;
    background-color: ${typeColorModifier(type)};
    font-size: ${theme.font.sizes.small};
    font-weight: bold;
    transition: background-color 0.3s ease;
    min-width: 6rem;

    &:hover {
      background-color: ${lighten(0.2, typeColorModifier(type))};
    }
  `}
`
export const Label = styled.p<Pick<PlayerStatProps, 'scheme'>>`
  ${({ theme, scheme }) => css`
    font-size: ${theme.font.sizes.small};
    color: ${scheme === 'light' ? theme.colors.white : theme.colors.black};
    margin-right: ${theme.font.sizes.small};
  `}
`
