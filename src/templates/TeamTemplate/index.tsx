import * as S from './styles'
import Navbar from 'components/Navbar'

type TeamTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}

const TeamTemplate = ({ children }: TeamTemplateProps) => (
  <>
    <Navbar variant />
    <S.Wrapper>{children}</S.Wrapper>
  </>
)

export default TeamTemplate
