import * as S from './styles'

export type HeadingProps = {
  children: React.ReactNode
  color?: 'light' | 'dark' | 'primary'
  size?: 'small' | 'normal' | 'large'
}

const Heading = ({
  children,
  color = 'light',
  size = 'normal'
}: HeadingProps) => (
  <S.Wrapper size={size} color={color}>
    {children}
  </S.Wrapper>
)

export default Heading
