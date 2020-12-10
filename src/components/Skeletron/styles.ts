import styled, { css } from 'styled-components'

import { SkeletronProps } from '.'

export const Wrapper = styled.div<SkeletronProps>`
  ${({ theme, width, height }) => css`
    width: ${width};
    height: ${height};
    background-color: #dadfe1;
    position: relative;
    border-radius: ${theme.border.radius};
    overflow: hidden;

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: inherit;
      height: inherit;
      border-radius: inherit;
      background-color: rgba(255, 255, 255, 0.5);
      animation: move 1s 0.5s ease infinite;
    }

    @keyframes move {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(100%);
      }
    }
  `}
`
