import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  display: grid;
  grid-template-columns: 30rem calc(100% - 30rem);
  height: 100%;

  ${media.lessThan('medium')`
    grid-template-columns: repeat(1, 1fr);
  `}
`
export const SideMenu = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${lighten(0.1, '#011627')};
`
export const Header = styled.div`
  height: 22rem;
  width: 100%;
  background-color: #011627;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
`

export const MenuContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8.5rem 0.8rem;
`

export const ComparisonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const MenuLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 0.1rem solid rgba(255, 255, 255, 0.2);
  margin: 1rem 0;
`

export const ComparisonLine = styled.hr`
  width: 100%;
  border: none;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.2);
`

export const MenuItem = styled.div`
  ${({ theme }) => css`
    width: 100%;
    padding: 2rem ${theme.spacings.xxsmall};
    display: flex;
    align-items: center;
    color: white;
    font-size: ${theme.font.sizes.small};
    cursor: pointer;
    > :first-child {
      margin-right: 1rem;
    }
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
  `}
`
export const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  > svg {
    width: 100%;
    height: 100%;
    color: #fafafa;
  }
`
export const Container = styled.div`
  width: 100%;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 1rem;
`
export const NoResultSWrapper = styled.div`
  padding: 2rem;
`
