import * as S from './styles'

type SectionBackgroundWrapper = {
  children?: React.ReactNode | React.ReactNodeArray
}

const SectionBackground = ({ children }: SectionBackgroundWrapper) => (
  <S.Wrapper>
    <span></span>
    {children}
  </S.Wrapper>
)

export default SectionBackground
