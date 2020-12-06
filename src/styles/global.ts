import { createGlobalStyle } from 'styled-components'
import { css } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url('/fonts/rubik-v11-latin-regular.woff2') format('woff2')
  }
  @font-face {
    font-family: 'Rubik';
    font-style: normal;
    font-weight: 700;
    src: local(''),
        url('/fonts/rubik-v11-latin-700.woff2') format('woff2')
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    &:after,
    &:before {
      box-sizing: border-box;
    }
  }

  html {
    font-size: 62.5%;
  }

  html, body, #__next {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    ${({ theme }) => css`
      font-family: ${theme.font.family};
      background-color: ${theme.colors.mainBg};
    `}
  }
`

export default GlobalStyles
