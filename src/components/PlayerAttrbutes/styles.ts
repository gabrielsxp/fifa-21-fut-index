import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Heading = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.primary};
    font-size: ${theme.font.sizes.large};
    font-weight: bold;
  `}
`
export const TopAttributeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Wrapper = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacings.small};
    margin: ${theme.spacings.small} 0;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
      0 2px 10px 0 rgba(0, 0, 0, 0.12);
  `}
`

export const Grid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-gap: ${theme.grid.gutter};
    grid-template-columns: repeat(3, 1fr);

    ${media.lessThan('medium')`
      grid-template-columns: repeat(1, 1fr);
    `}
  `}
`
export const AttributeSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    > div {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`
