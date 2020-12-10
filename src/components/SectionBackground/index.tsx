import * as S from './styles'

export type SectionBackgroundWrapper = {
  children?: React.ReactNode | React.ReactNodeArray
  reduced?: boolean
  onTop?: boolean
  color?: string
}

const SectionBackground = ({
  children,
  reduced = false,
  onTop = false,
  color = 'secondary'
}: SectionBackgroundWrapper) => (
  <S.Wrapper color={color} reduced={reduced} onTop={onTop}>
    <span />
    {children}
  </S.Wrapper>
)

export default SectionBackground
