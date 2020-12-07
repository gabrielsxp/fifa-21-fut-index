import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
`

export const SectionTitles = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-bottom: ${theme.spacings.small};
    > h2 {
      margin-bottom: ${theme.spacings.xxsmall};
      text-align: center;
    }
  `}
`
