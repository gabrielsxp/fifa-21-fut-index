import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    > div {
      padding: ${theme.spacings.small} 0;
    }
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

export const PlayersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 100%;
  overflow: hidden;
  align-content: flex-start;
  grid-gap: 1rem;
  ${media.greaterThan('medium')`
    grid-template-columns: repeat(12, 1fr);
  `}
`
export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
