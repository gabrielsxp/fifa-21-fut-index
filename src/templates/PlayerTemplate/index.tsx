import * as S from './styles'
import Navbar from 'components/Navbar'

type PlayerTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}

const PlayerTemplate = ({ children }: PlayerTemplateProps) => (
  <>
    <Navbar variant />
    <S.Wrapper>{children}</S.Wrapper>
  </>
)

export default PlayerTemplate
