import * as S from './styles'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

type TeamTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}

const TeamTemplate = ({ children }: TeamTemplateProps) => (
  <>
    <Navbar variant />
    <S.Wrapper>{children}</S.Wrapper>
    <Footer />
  </>
)

export default TeamTemplate
