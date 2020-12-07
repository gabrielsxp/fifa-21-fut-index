import styled, { css } from 'styled-components'
import { darken, rgba } from 'polished'

export const Wrapper = styled.header`
  ${({ theme }) => css`
    position: relative;
    width: 100%;
    min-height: 50rem;
    padding: 2rem 0;

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
      background-color: ${rgba(darken(0.5, theme.colors.secondary), 0.7)};
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
