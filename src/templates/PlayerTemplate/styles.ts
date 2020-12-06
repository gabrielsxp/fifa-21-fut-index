import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  overflow-x: hidden;
`
export const Grid = styled.div`
  display: grid;
  grid-template-columns: 22rem calc(100% - 22rem);
  grid-gap: 2rem;

  ${media.lessThan('medium')`
    grid-template-columns: repeat(1, 1fr);
    align-items: center;
  `}
`
