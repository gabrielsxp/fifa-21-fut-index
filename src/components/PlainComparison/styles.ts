import styled, { css } from 'styled-components'
import media from 'styled-media-query'
import { PlainComparisonProps } from '.'

export const Wrapper = styled.section`
  ${({ theme }) => css`
    padding: ${theme.spacings.small} 0;
  `}
`

export const TopSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`
export const AttributeComparisonGrid = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: ${theme.grid.gutter};

    ${media.lessThan('medium')`
      grid-template-columns: repeat(2, 1fr);
    `}
  `}
`
export const ComparisonSwitchContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    > * {
      margin-right: ${theme.spacings.xsmall};
    }
  `}
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const PlayerContainer = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    > div {
      margin-bottom: ${theme.spacings.xxsmall};
    }
    > button {
      margin-bottom: ${theme.spacings.xxsmall};
    }
  `}
`
export const PlayerPosition = styled.div<Pick<PlainComparisonProps, 'scheme'>>`
  ${({ theme, scheme }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${scheme === 'light' ? theme.colors.white : theme.colors.black};
    font-weight: normal;
    text-align: center;
  `}
`
