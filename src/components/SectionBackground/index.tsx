import * as S from './styles'

export type SectionBackgroundWrapper = {
  children?: React.ReactNode | React.ReactNodeArray
  reduced?: boolean
  onTop?: boolean
}

const SectionBackground = ({
  children,
  reduced = false,
  onTop = false
}: SectionBackgroundWrapper) => (
  <S.Wrapper reduced={reduced} onTop={onTop}>
    <span />
    {children}
  </S.Wrapper>
)

export default SectionBackground
