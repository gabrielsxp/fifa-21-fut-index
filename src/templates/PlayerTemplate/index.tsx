import * as S from './styles'

type PlayerTemplateProps = {
  children?: React.ReactNodeArray | React.ReactNode
}

const PlayerTemplate = ({ children }: PlayerTemplateProps) => (
  <S.Wrapper>{children}</S.Wrapper>
)

export default PlayerTemplate
