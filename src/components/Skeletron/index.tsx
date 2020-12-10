import * as S from './styles'

export type SkeletronProps = {
  width?: number | string
  height?: number | string
}

const Skeletron = ({ width = '100%', height = '100%' }: SkeletronProps) => (
  <S.Wrapper width={width} height={height}></S.Wrapper>
)

export default Skeletron
