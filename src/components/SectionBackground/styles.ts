import styled, { css } from 'styled-components'
import { darken, rgba } from 'polished'
import { SectionBackgroundWrapper } from '.'

export const Wrapper = styled.header<
  Pick<SectionBackgroundWrapper, 'reduced' | 'onTop' | 'color'>
>`
  ${({ theme, reduced, onTop, color }) => css`
    position: relative;
    width: 100%;
    min-height: ${reduced ? '25rem' : '50rem'};
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
      top: ${onTop ? '-7rem' : '0'};
      left: 0;
      background-color: ${rgba(darken(0.5, theme.colors[color!]), 0.7)};
      background-size: cover;
      width: 100%;
      height: ${onTop ? 'calc(100% + 7rem)' : '100%'};
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
