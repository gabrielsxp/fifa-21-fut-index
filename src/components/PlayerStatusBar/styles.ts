import styled, { css } from 'styled-components'
import { darken } from 'polished'
import { PlayerStatusBarProps } from '.'

type FillProps = PlayerStatusBarProps & { type: string }

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
  flex-direction: column;
  max-width: 33rem;
`

export const Wrapper = styled.div`
  position: relative;
  border-radius: 2.5rem;
  background-color: #e3e1e1;
  height: 1rem;
  transition: all 0.3s ease;
  overflow: hidden;
  width: 100%;
  max-width: 100%;

  &:hover {
    background-color: ${darken(0.1, '#e3e1e1')};
  }
`
export const Fill = styled.div<FillProps>`
  ${({ stat, type }) => css`
    position: relative;
    left: -${stat}%;
    width: ${stat}%;
    max-width: 100%;
    border-radius: 2.5rem;
    height: 100%;
    background-color: ${typeColorModifier(type)};
    animation: slideBar 0.75s ease-in forwards;

    @keyframes slideBar {
      from {
        transform: translateX(0%);
      }
      to {
        transform: translateX(100%);
      }
    }
  `}
`

export const Label = styled.div<Pick<PlayerStatusBarProps, 'scheme'>>`
  ${({ theme, scheme }) => css`
    font-size: ${theme.font.sizes.small};
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    width: 100%;
    color: ${scheme === 'light' ? theme.colors.white : darken(0.4, '#e3e1e1')};
    margin-bottom: ${theme.font.sizes.xsmall};
  `}
`
