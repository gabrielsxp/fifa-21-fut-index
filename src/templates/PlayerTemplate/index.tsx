import * as S from './styles'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

type PlayerTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}

const PlayerTemplate = ({ children }: PlayerTemplateProps) => (
  <>
    <Navbar variant />
    <S.Wrapper>{children}</S.Wrapper>
    <Footer />
  </>
)

export default PlayerTemplate
