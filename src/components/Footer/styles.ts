import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.div`
  background-color: #011627;
  display: flex;
  flex-direction: column;
  position: relative;
`
export const TopFooter = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.secondary};
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    padding: ${theme.spacings.medium};
    padding: ${theme.spacings.xxlarge} 0;

    ${media.greaterThan('medium')`
      grid-template-columns: repeat(3, 1fr);
      grid-gap: ${theme.grid.gutter};
    `}
  `}
`
export const BottomFooter = styled.footer`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: ${theme.spacings.small} 0;
    > p {
      font-size: ${theme.font.sizes.small};
      color: ${theme.colors.white};
      letter-spacing: 0.1rem;
    }
  `}
`
export const Heading = styled.h2`
  ${({ theme }) => css`
    position: relative;
    font-size: ${theme.font.sizes.xlarge};
    color: ${theme.colors.white};
    font-weight: bold;
    margin-bottom: ${theme.spacings.medium};

    &:after {
      content: '';
      position: absolute;
      width: 3rem;
      height: 0.2rem;
      background-color: ${theme.colors.primary};
      bottom: -1rem;
      left: 0;
    }
  `}
`
export const FooterSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    > p {
      font-size: ${theme.font.sizes.xsmall};
      text-align: center;
      color: ${theme.colors.white};
      font-weight: bold;
      margin: ${theme.spacings.xxsmall} 0;
    }
  `}
`
export const FooterLink = styled.a`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes.medium};
    text-decoration: none;
    color: ${theme.colors.white};
    margin-bottom: ${theme.spacings.xsmall};
    letter-spacing: 0.2rem;
    &:hover {
      text-decoration: underline;
    }
  `}
`
export const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`
export const SocialContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  > a {
    margin-right: 1rem;
    margin-bottom: 1rem;
  }
`
