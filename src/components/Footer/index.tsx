import * as S from './styles'
import Logo from 'components/Logo'
import { Container } from 'components/Container'

const Footer = () => (
  <S.Wrapper>
    <Container>
      <S.BottomFooter>
        <S.LogoWrapper>
          <Logo />
        </S.LogoWrapper>
        <p>
          Copyright@{new Date().getFullYear()} FutStats. All FIFA assets are
          property of EA Sports.
        </p>
      </S.BottomFooter>
    </Container>
  </S.Wrapper>
)

export default Footer
