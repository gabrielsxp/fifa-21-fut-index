import styled from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.img`
  width: auto;
  height: 7rem;

  ${media.lessThan('medium')`
    height: 4rem;
  `}
`
export const LogoWrapper = styled.a`
  position: relative;
  text-decoration: none;
`
